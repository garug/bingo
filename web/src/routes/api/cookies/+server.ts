import type { LoadEvent, RequestEvent } from "@sveltejs/kit";

export async function POST({ cookies, request }: RequestEvent) {
  const body = await request.json();

  cookies.set(body.name, body.value, {
    path: "/",
    maxAge: body.maxAge,
  });

  return new Response();
}
