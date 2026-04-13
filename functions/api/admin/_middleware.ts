const ALLOWED_HOST = "plants.skg.gg";

export const onRequest: PagesFunction = async (context) => {
  const host = new URL(context.request.url).hostname;

  if (host !== ALLOWED_HOST) {
    return Response.json(
      { error: "Admin access is only available on the primary domain" },
      { status: 403 }
    );
  }

  return context.next();
};
