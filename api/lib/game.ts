import { insert, query, queryBegins } from "@services/dynamodb.ts";
import { UUID } from "@lib/uuid.ts";
import { generateCode } from "@lib/code.ts";
import { Err, Ok } from "@lib/result.ts";

export type GameOptions = {
  password: string;
};

export type GameInstance = {
  id: string;
  code: string;
  created_at: number;
  password?: string;
};

export const gameNumbers = Array.from({ length: 99 }).map((_, idx) => idx + 1);

export async function createGame(options: GameOptions) {
  const id = crypto.randomUUID();

  const game = {
    pk: id,
    sk: "#info",
    created_at: Date.now(),
    code: generateCode(),
    password: options.password,
  };

  await insert(game);

  return { id: game.pk };
}

export async function fetchGame(id: UUID) {
  const game = await query(id);

  if (!game) return Err("not_found");

  return Ok(game as GameInstance);
}

export async function getNumbers(id: UUID) {
  const numbers = await queryBegins(id, `#number`);

  if (numbers.type === "error") return numbers;

  return Ok(numbers.value.map((e) => Number(e.value)));
}
