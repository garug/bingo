import { HttpResponses } from "@lib/statusCode.ts";
import { setupRoutes } from "./setup/routes.ts";
import { RouteModule } from "@lib/routing.ts";

const routes = await setupRoutes();

Deno.serve(async (req) => {
  const url = new URL(req.url);

  const route = routes.get(url.pathname);

  if (!route?.path) return HttpResponses.NOT_FOUND();

  let module: RouteModule | undefined;

  try {
    module = await import(`./${route.path}`);
  } catch (e) {
    console.error("Unexpected error during module import:", e);
    return HttpResponses.INTERNAL();
  }

  return module?.[req.method]?.(req, route) ?? HttpResponses.NOT_IMPLEMENTED();
});
