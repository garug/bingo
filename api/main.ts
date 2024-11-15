import { HttpResponses } from "@lib/statusCode.ts";
import { setupRoutes } from "./setup/routes.ts";
import { importModule } from "@lib/importModule.ts";

const routes = await setupRoutes();

Deno.serve(async (req) => {
  const url = new URL(req.url);

  const route = routes.get(url.pathname);

  if (!route?.path) return HttpResponses.NOT_FOUND();

  const module = await importModule(route.path);

  if (typeof module === "string") return HttpResponses.fromString(module);

  return module?.[req.method]?.(req, route) ?? HttpResponses.NOT_IMPLEMENTED();
});
