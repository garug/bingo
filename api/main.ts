import type { RouteModule } from "@lib/routing.ts";
import { HttpResponses } from "@lib/statusCode.ts";
import { setupRoutes } from "./setup/routes.ts";

const routes = await setupRoutes();

Deno.serve(async (req) => {
  const url = new URL(req.url);

  const route = routes.get(url.pathname);

  let module: RouteModule | undefined;

  try {
    module = await import(`./${route?.path}`);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ERR_MODULE_NOT_FOUND"
    ) {
      return HttpResponses.NOT_FOUND();
    }

    return HttpResponses.INTERNAL();
  }

  return module?.[req.method]?.(req, route) ?? HttpResponses.NOT_IMPLEMENTED();
});
