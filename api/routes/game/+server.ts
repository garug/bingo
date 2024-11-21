import { authenticate } from "@lib/auth.ts";
import { HttpResponses, statusCode } from "@lib/statusCode.ts";
import { createGame } from "@lib/game.ts";

export async function POST(req: Request) {
  const err = await authenticate(req);

  if (err) return new Response(err, { status: statusCode(err) });

  const { password } = await req.json();

  if (!password) {
    return HttpResponses.NOT_ACCEPTABLE("password must be provided");
  }

  const game = await createGame({ password });

  return Response.json(game, { status: 201 });
}
