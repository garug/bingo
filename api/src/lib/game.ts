import {
  insert,
  insertBatch,
  query,
  querySk,
  queryBegins,
  queryCustom,
} from "@services/database/mod.ts";
import { UUID } from "@lib/uuid.ts";
import { generateCode } from "@lib/code.ts";
import { Err, Ok } from "@lib/result.ts";
import { logger } from "@lib/logger.ts";
import { uniqueCard } from "@lib/cards.ts";

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

  const game_code = generateCode();

  const game = {
    pk: id,
    sk: "#game",
    created_at,
    value: password,
    game_code,
    user,
  };

  const info = {
    pk: user,
    sk: `#game#${password}`,
    created_at,
    ref: id,
  };

  const code = {
    pk: "code",
    sk: `#${game_code}`,
    created_at,
    ref: id,
  };

  const result = await insertBatch([game, info, code]);

  if (result.type === "ok") {
    return Ok({ id: game.pk });
  } else {
    const alreadyHasInfo = result.error[1];

    if (alreadyHasInfo) {
      return Err("game_already_exists");
    }

    return result;
  }
}

export async function fetchGame(id: UUID, usePassword = false) {
  const result = await query(id);

  if (result.type === "error") return result;

  const game = result.value!;

  if (!usePassword) delete game.value;

  const gameInstance = { id, ...game } as GameInstance;

  return Ok(gameInstance);
}

export async function getNumbers(id: UUID) {
  const numbers = await queryBegins(id, `#number`);

  if (numbers.type === "error") return numbers;

  return Ok(numbers.value?.map((e) => Number(e.value)));
}

export function insertGameNumber(id: UUID, number: number) {
  return insert({
    pk: id,
    sk: `#number#${number}`,
    value: number,
    created_at: Date.now(),
  });
}

export async function fetchUserGames(user: string) {
  return await queryCustom({
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": { S: user },
      ":sk": { S: "#game" },
    },
  });
}

export async function addToGame(user: string, code: string) {
  const game = await querySk("code", `#${code}`);

  if (game.type === "error") return game;

  const created_at = Date.now();

  const card = uniqueCard(created_at);

  const session = {
    pk: user,
    sk: `#session#${game.value!.ref}`,
    ref: card.sk,
    created_at,
  };

  const result = await insertBatch([session, card]);

  if (result.type === "error") return result;

  return Ok({
    id: game.value!.ref,
    card: { id: card.sk, numbers: card.numbers },
  });
}
