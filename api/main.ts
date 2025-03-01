import { socket } from "@services/socket/mod.ts";

import { logger } from "@lib/logger.ts";
import { RouteModule } from "@lib/routing.ts";
import { isResult } from "@lib/result.ts";
import { handleResponse, createResponse } from "@lib/http/response.ts";

import { setupRoutes } from "./setup/routes.ts";

const routes = await setupRoutes();

Deno.serve(
  socket.handler(async (req) => {
    const url = new URL(req.url);

    const route = routes.get(url.pathname);

    if (!route?.path) return createResponse("Not found", 404);

    let module: RouteModule;

    try {
      module = await import(`./${route.path}`);
    } catch (e) {
      logger.error("import_error", e);
      return createResponse("Internal server error", 500);
    }

    const handler = module?.[req.method];

    if (!handler) return createResponse("Method not implemented", 501);

    try {
      const result = await handler(req, route);

      return isResult(result)
        ? handleResponse(result)
        : createResponse("invalid response", 500);
    } catch (e) {
      logger.error("handler_error", e);
      return createResponse("Internal server error", 500);
    }
  })
);
