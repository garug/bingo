import type { LoadEvent, RequestEvent } from "@sveltejs/kit";

export async function POST({ cookies, request }: RequestEvent) {
  const body = await request.json();

  cookies.set(body.name, body.value, {
    path: "/",
    httpOnly: true,
    maxAge: body.maxAge,
    sameSite: "strict",
  });

  return new Response();
}
