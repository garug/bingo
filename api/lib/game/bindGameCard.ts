import type { UUID } from "@lib/uuid.ts";
import { insert } from "@services/dynamodb.ts";

export async function bindCardGame(user: string, card: UUID, game: UUID) {
  // TODO validate card and game exists before assign
  // TODO card should be used just once?

  const created_at = Date.now();

  // const _response = await insert({
  //   id: `game#${game};card#${card};user#${user}`,
  //   created_at,
  // });

  return {
    card,
    game,
    created_at,
  };
}
