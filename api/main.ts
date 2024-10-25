Deno.serve((_req) => {
  return new Response("Not found", {
    status: 404,
  });
});
