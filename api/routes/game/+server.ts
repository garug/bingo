import { authenticate } from "@lib/auth.ts";
import { HttpResponses, statusCode } from "@lib/statusCode.ts";
import { createGame } from "@lib/game.ts";

export async function POST(req: Request) {
  // const err = await authenticate(req);

  // if (err) return new Response(err, { status: statusCode(err) });

  let password;

  try {
    const body = await req.json();
    password = body.password;
  } catch (e) {
    console.log(e);
  }

  if (!password) {
    return HttpResponses.NOT_ACCEPTABLE("password must be provided");
  }

  const { id } = await createGame({ password });

  return Response.json({ id }, { status: 201 });
}
