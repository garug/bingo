Deno.serve(async (req) => {
  const url = new URL(req.url);

  let module;

  try {
    module = await import(`./routes${url.pathname}/+server.ts`);
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
