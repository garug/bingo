import { HttpResponses } from "@lib/statusCode.ts";
import { setupRoutes } from "./setup/routes.ts";
import { RouteModule } from "@lib/routing.ts";
import { isResult } from "@lib/result.ts";
import { logger } from "@lib/logger.ts";
import { io } from "@services/socket/index.ts";

const routes = await setupRoutes();

// TODO: improve remove any for handleOk and handleErr
// deno-lint-ignore no-explicit-any
function handleOk(result: any) {
  const data = result.value;

  const init = {
    status: result.status || 200,
    headers,
  };

  logger.http(JSON.stringify(data));

  return Response.json(data, init);
}

// deno-lint-ignore no-explicit-any
function handleErr(result: any) {
  const data = { error: result.error };

  const init = {
    status: result.status || 400,
    headers,
  };

  logger.http(JSON.stringify(data));

  return Response.json(data, init);
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  // "Content-Encoding": "gzip"
};

Deno.serve(
  io.handler(async (req) => {
    const url = new URL(req.url);

    const route = routes.get(url.pathname);

    if (!route?.path) return HttpResponses.NOT_FOUND();

    let module: RouteModule | undefined;

    try {
      module = await import(`./${route.path}`);
    } catch (e) {
      logger.error("Unexpected error during module import:", e);
      return HttpResponses.INTERNAL();
    }

    const result = await module?.[req.method]?.(req, route);

    if (result && isResult(result)) {
      return result.type === "ok" ? handleOk(result) : handleErr(result);
    }

    return (
      result ??
      new Response("Method not implemented", {
        status: 501,
        headers,
      })
    );
  })
);
