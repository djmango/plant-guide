interface Env {
  DB: D1Database;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const slug = url.searchParams.get("slug");

  try {
    let result;
    if (slug) {
      result = await context.env.DB.prepare(
        "SELECT * FROM watering_logs WHERE plant_slug = ? ORDER BY watered_at DESC LIMIT 50"
      )
        .bind(slug)
        .all();
    } else {
      result = await context.env.DB.prepare(
        "SELECT * FROM watering_logs ORDER BY watered_at DESC LIMIT 200"
      ).all();
    }

    return Response.json(
      { logs: result.results },
      { headers: corsHeaders }
    );
  } catch (e) {
    return Response.json(
      { error: "Failed to fetch watering logs" },
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as {
      slug?: string;
      notes?: string;
    };

    if (!body.slug) {
      return Response.json(
        { error: "slug is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const ip =
      context.request.headers.get("cf-connecting-ip") ||
      context.request.headers.get("x-forwarded-for") ||
      null;
    const userAgent = context.request.headers.get("user-agent") || null;

    const result = await context.env.DB.prepare(
      "INSERT INTO watering_logs (plant_slug, watered_at, notes, ip, user_agent) VALUES (?, datetime('now'), ?, ?, ?)"
    )
      .bind(body.slug, body.notes || null, ip, userAgent)
      .run();

    return Response.json(
      { success: true, id: result.meta.last_row_id },
      { status: 201, headers: corsHeaders }
    );
  } catch (e) {
    return Response.json(
      { error: "Failed to log watering" },
      { status: 500, headers: corsHeaders }
    );
  }
};
