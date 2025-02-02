import type { LoadEvent, RequestEvent } from "@sveltejs/kit";

export async function DELETE({ cookies, params }: RequestEvent) {
  cookies.delete(params.name as string, {
    path: "/",
  });

  // TODO retornar 201
  return new Response();
}
