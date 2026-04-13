interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "500"), 1000);

    const result = await context.env.DB.prepare(
      "SELECT id, plant_slug, watered_at, notes, ip, user_agent FROM watering_logs ORDER BY watered_at DESC LIMIT ?"
    )
      .bind(limit)
      .all();

    const stats = await context.env.DB.prepare(
      "SELECT ip, COUNT(*) as count FROM watering_logs GROUP BY ip ORDER BY count DESC LIMIT 50"
    ).all();

    return Response.json({
      logs: result.results,
      ip_stats: stats.results,
      total: result.results.length,
    });
  } catch (e) {
    return Response.json(
      { error: "Failed to fetch admin logs" },
      { status: 500 }
    );
  }
};
