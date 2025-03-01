import {
  insert,
  insertBatch,
  query,
  queryBegins,
  queryCustom,
} from "@services/database/mod.ts";
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

  if (!usePassword) delete game.password;

  const gameInstance: GameInstance = { id, ...game.value };

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
