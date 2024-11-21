import { Route, usePathParameters } from "@lib/routing.ts";
import { fetchGame } from "@lib/game.ts";
import { UUID } from "@lib/uuid.ts";
import { HttpResponses } from "@lib/statusCode.ts";
import { fetchCard } from "@lib/cards.ts";

export async function POST(req: Request, route: Route) {
  const { id } = usePathParameters(req, route);
  const { cardId } = await req.json();

  if (!cardId) return HttpResponses.NOT_ACCEPTABLE("cardId must be provided");

  // TODO parei aqui
  //   const bind = await bindCardOnGame(id, cardId);

  const Rgame = fetchGame(id as UUID);

  const Rcard = fetchCard(cardId as UUID);

  const response = await Promise.all([Rgame, Rcard]);

  if (response.some((e) => e === undefined)) {
    const elements = [];
    if (!response[0]) elements.push("game");

    if (!response[1]) elements.push("card");

    const cause = `${elements.join(", ")} not found`;

    return HttpResponses.NOT_FOUND({
      cause,
    });
  }

  return new Response("Ola");
}
