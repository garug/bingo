import { Route, usePathParameters } from "@lib/routing.ts";
import { gameNumbers, getNumbers, insertGameNumber } from "@lib/game.ts";
import { Err, Ok } from "@lib/result.ts";
import { isValidUUID, UUID } from "@lib/uuid.ts";
import { socket } from "../../../../services/socket/mod.ts";

export async function POST(req: Request, route: Route) {
  const { id } = usePathParameters(req, route);

  if (!id) {
    return Err("id must be provided");
  }

  if (!isValidUUID(id)) {
    return Err("id must be a valid UUID");
  }

  const gameId = id as UUID;

  const alradySorted = await getNumbers(gameId);

  if (alradySorted.type === "error") {
    return alradySorted;
  }

  const possibilities = gameNumbers.filter(
    (e) => !alradySorted.value?.includes(e)
  );

  const idx = Math.floor(Math.random() * possibilities.length);
  const sortedNumber = possibilities[idx];

  await insertGameNumber(gameId, sortedNumber);

  socket.emit(gameId, sortedNumber);

  return Ok(sortedNumber);
}
