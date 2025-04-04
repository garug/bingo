import { Route, usePathParameters } from "@lib/routing.ts";
import { UUID } from "@lib/uuid.ts";
import { fetchCard } from "@lib/cards.ts";
import { bindCardGame } from "@lib/game/bindGameCard.ts";
import { useToken } from "@lib/auth.ts";
import { ErrStatus } from "@lib/result.ts";

export async function POST(req: Request, route: Route) {
  const { id } = usePathParameters(req, route);
  const { cardId } = await req.json();

  if (!cardId) return ErrStatus("cardId must be provided", 422);

  const user = await useToken(req);

  return bindCardGame("", id as UUID, cardId as UUID);
}
