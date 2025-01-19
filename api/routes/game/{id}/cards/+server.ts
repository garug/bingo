import { Route, usePathParameters } from "@lib/routing.ts";
import { UUID } from "@lib/uuid.ts";
import { HttpResponses } from "@lib/statusCode.ts";
import { fetchCard } from "@lib/cards.ts";
import { bindCardGame } from "@lib/game/bindGameCard.ts";
import { useToken } from "@lib/auth.ts";

export async function POST(req: Request, route: Route) {
  const { id } = usePathParameters(req, route);
  const { cardId } = await req.json();

  if (!cardId) return HttpResponses.NOT_ACCEPTABLE("cardId must be provided");

  let bind;

  const user = await useToken(req);

  try {
    bind = await bindCardGame("", id as UUID, cardId as UUID);
  } catch (e) {
    return Response.json(e, {
      status: 400,
    });
  }

  return new Response("Ola");
}
