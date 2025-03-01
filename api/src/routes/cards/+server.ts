import { authenticate } from "@lib/auth.ts";
import { generateCards } from "@lib/cards.ts";
import { statusCode } from "@lib/statusCode.ts";
import { ErrStatus, OkStatus } from "@lib/result.ts";

export async function POST(req: Request) {
  const result = await authenticate(req);

  if (result.type === "error")
    return ErrStatus(result.error, statusCode(result.error));

  const { amount } = await req.json();

  if (!amount) return ErrStatus("amount must be provided", 422);

  if (amount > 25) return ErrStatus("maximum amount is 25", 422);

  const cards = await generateCards(amount);

  if (cards.type === "ok") {
    return OkStatus(cards.value, 201);
  }

  return cards;
}
