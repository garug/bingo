import { Route, usePathParameters } from "@lib/routing.ts";
import { isValidUUID, UUID } from "@lib/uuid.ts";
import { ErrStatus, Ok } from "@lib/result.ts";
import { authenticate } from "@lib/auth.ts";
import { logger } from "@lib/logger.ts";
import { getItem } from "@services/database/mod.ts";

export async function GET(req: Request, route: Route) {
  const resultUser = await authenticate(req);

  if (resultUser.type === "error") return resultUser;

  const { game } = usePathParameters(req, route);

  if (!game) {
    return ErrStatus("game id is missing", 422);
  }

  if (!isValidUUID(game)) {
    return ErrStatus("id must be a valid UUID", 422);
  }

  const user = resultUser.value;

  const gameId = game as UUID;

  logger.info("user joined", { user, game: gameId });

  const resultSession = await getItem({
    pk: user,
    sk: `#session#${gameId}`,
  });

  if (resultSession.type === "error") return resultSession;

  const resultCard = await getItem({
    pk: "card",
    sk: resultSession.value!.ref,
  });

  if (resultCard.type === "error") return resultCard;

  return Ok({
    session: resultSession.value,
    card: resultCard.value,
  });
}
