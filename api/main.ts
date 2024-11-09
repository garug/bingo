import { setupRoutes } from "./setup/routes.ts";

const { routes } = await setupRoutes();

Deno.serve(async (req) => {
  const url = new URL(req.url);

  let module;

  let route;

  try {
    route = routes.find((e) => e.regExp.test(url.pathname));
    module = await import(`./${route?.path}`);
  } catch (_error) {
    return new Response("Not found", {
      status: 404,
    });
  }

  if (module[req.method]) {
    return module[req.method](req, route);
  }

  return new Response("Method not implemented", {
    status: 501,
  });
});
