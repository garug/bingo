import { join } from "@std/path";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  let module;

  try {
    const path = join("routes", url.pathname, "+server.ts");
    module = await import(`./${path}`);
  } catch (_error) {
    return new Response("Not found", {
      status: 404,
    });
  }

  if (module[req.method]) {
    return module[req.method](req);
  }

  return new Response("Method not implemented", {
    status: 501,
  });
});
