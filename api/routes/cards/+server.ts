import { authenticate } from "@lib/auth.ts";
import { generateCards } from "@lib/cards.ts";
import { HttpResponses, statusCode } from "@lib/statusCode.ts";

export async function POST(req: Request) {
  const err = await authenticate(req);

  if (err) return new Response(err, { status: statusCode(err) });

  const { amount } = await req.json();

  if (!amount) return HttpResponses.NOT_ACCEPTABLE("amount must be provided");

  if (amount > 25) return HttpResponses.NOT_ACCEPTABLE("maximum amount is 25");

  const cards = await generateCards(amount);

  return Response.json(cards, { status: 201 });
}
