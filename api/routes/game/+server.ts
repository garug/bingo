import { authenticate } from "@lib/auth.ts";
import { statusCode } from "@lib/statusCode.ts";
import { createGame } from "@lib/game.ts";
import { logger } from "@lib/logger.ts";
import { Err, ErrStatus, OkStatus } from "@lib/result.ts";

export async function POST(req: Request) {
  const user = await authenticate(req);

  if (user.type === "error")
    return ErrStatus(user.error, statusCode(user.error));

  let password;

  try {
    const body = await req.json();
    password = body.password;
  } catch (_e) {
    return Err("invalid request body");
  }

  if (!password) {
    return Err("password must be provided");
  }

  const result = await createGame({ password, user: "some_user" });

  if (result.type === "error") {
    return result;
  }

  logger.info("Game created: ", { id: result.value?.id });

  return OkStatus({ id: result.value?.id }, 201);
}
