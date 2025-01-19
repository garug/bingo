import { Route, usePathParameters } from "@lib/routing.ts";
import { gameNumbers, getNumbers } from "@lib/game.ts";
import { Err } from "@lib/result.ts";
import { isValidUUID, UUID } from "@lib/uuid.ts";

export async function POST(req: Request, route: Route) {
  const { id } = usePathParameters(req, route);

  if (!id) {
    return Err("id must be provided");
  }

  if (!isValidUUID(id)) {
    return Err("id must be a valid UUID");
  }

  const alradySorted = await getNumbers(id as UUID);

  if (alradySorted.type === "error") {
    return alradySorted;
  }

  const possibilities = gameNumbers.filter((e) => !alradySorted.value.includes(e));

  // TODO parei aqui

  return getNumbers(id as UUID);
}
