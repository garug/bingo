import { authenticate } from "@lib/auth.ts";
import { statusCode } from "@lib/statusCode.ts";

export async function POST(req: Request) {
  const err = await authenticate(req);

  if (err) return new Response(err, { status: statusCode(err) });

  return new Response("Sucess", {
    status: 200,
  });
}
