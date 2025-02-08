import {
  insert,
  insertBatch,
  query,
  querySk,
  queryBegins,
} from "@services/dynamodb.ts";
import { UUID } from "@lib/uuid.ts";
import { generateCode } from "@lib/code.ts";
import { Err, Ok } from "@lib/result.ts";

export type GameOptions = {
  password: string;
  user: string;
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

  const { password, user } = options;

  const created_at = Date.now();

  const game = {
    pk: id,
    sk: "#password",
    created_at,
    value: password,
  };

  const info = {
    pk: user,
    sk: `#game#${password}`,
    created_at,
    ref: id,
  };

  const code = {
    pk: "code",
    sk: `#${generateCode()}`,
    created_at,
    game_id: id,
  };

  const result = await insertBatch([game, info, code]);

  return result.type === "ok" ? Ok({ id: game.pk }) : result;
}

export async function fetchGame(id: UUID, usePassword = false) {
  const result = await query(id);

  if (result.type === "error") return result;

  const game = result.value!;

  if (!usePassword) delete game.password;

  const gameInstance: GameInstance = { id, ...game.value };

  return Ok(gameInstance);
}

export async function getNumbers(id: UUID) {
  const numbers = await queryBegins(id, `#number`);

  if (numbers.type === "error") return numbers;

  return Ok(numbers.value?.map((e) => Number(e.value)));
}

export async function insertGameNumber(id: UUID, number: number) {
  await insert({
    pk: id,
    sk: `#number#${number}`,
    value: number,
    created_at: Date.now(),
  });

  return Ok();
}
