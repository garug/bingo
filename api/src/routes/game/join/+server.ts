import { authenticate } from "@lib/auth.ts";
import { Err, ErrStatus, OkStatus } from "@lib/result.ts";
import { statusCode } from "@lib/statusCode.ts";
import { addToGame } from "@lib/game.ts";
import { logger } from "@lib/logger.ts";

export async function POST(req: Request) {
  const user = await authenticate(req);

  if (user.type === "error")
    return ErrStatus(user.error, statusCode(user.error));

  let code: string | undefined;

  try {
    const body = await req.json();
    code = body.code;
  } catch (_e) {
    return Err("invalid request body");
  }

  if (!code) return Err("code must be provided");

  logger.verbose("adding to game", { user: user.value, code });

  const resultJoin = await addToGame(user.value!, code);

  if (resultJoin.type === "error") return resultJoin;

  logger.info("joined game", resultJoin.value);

  return OkStatus(resultJoin.value, 201);
}
