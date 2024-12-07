import { insert, fetch } from "@services/dynamodb.ts";
import { UUID } from "@lib/uuid.ts";

export type GameOptions = {
  password: string;
};

export async function createGame(options: GameOptions) {
  const id = crypto.randomUUID();

  const game = {
    id: `game#${id}`,
    created_at: Date.now(),
    password: options.password,
  };

  await insert(game);

  return { id: game.id };
}

export async function fetchGame(id: UUID) {
  const game = await fetch(`game#${id}`);

  console.log(game);

  return game;
}
