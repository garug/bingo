import { HttpResponses } from "@lib/statusCode.ts";
import { setupRoutes } from "./setup/routes.ts";
import { RouteModule } from "@lib/routing.ts";
import { isResult } from "@lib/result.ts";

const routes = await setupRoutes();

const headers = {
  "Access-Control-Allow-Origin": "*",
};

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

  const result = await module?.[req.method]?.(req, route);

  if (result && isResult(result)) {
    if (result.type === "ok") {
      return Response.json(result.value, {
        status: result.status || 200,
        headers,
      });
    }

    return Response.json(
      { error: result.error },
      {
        status: result.status || 400,
        headers,
      }
    );
  }

  return result ?? HttpResponses.NOT_IMPLEMENTED();
});
