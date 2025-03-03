import { Route, usePathParameters } from "@lib/routing.ts";
import { fetchGame, getNumbers } from "@lib/game.ts";
import { Err, Ok, checkResults } from "@lib/result.ts";
import { isValidUUID, UUID } from "@lib/uuid.ts";

export async function GET(req: Request, route: Route) {
  const { id } = usePathParameters(req, route);

  if (!id) {
    return Err("id must be provided");
  }

  if (!isValidUUID(id)) {
    return Err("id must be a valid UUID");
  }

  const gameId = id as UUID;

  const resolveNumbers = getNumbers(gameId);

  const resolveGame = fetchGame(gameId);

  const [numbers, game] = await Promise.all([resolveNumbers, resolveGame]);

  const allResults = checkResults([numbers, game]);

  if (allResults.Ok()) {
    // @ts-ignore: numbers and game are guaranteed to be ResultOk
    const returned = { numbers: numbers.value, game: game.value };

    return Ok(returned);
  } else {
    return Err(allResults.errors());
  }
}
