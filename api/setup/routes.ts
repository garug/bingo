import type { Route, RoutePathParameter } from "@lib/routing.ts";
import type { WalkEntry } from "@std/fs";
import { walk } from "@std/fs";
import { join } from "@std/path";

const serverRegExp = /(?<=.*)\+server\.ts\b/;

function dirEntryToRoute(dirEntry: WalkEntry): Route {
  const path = dirEntry.path;
  const route = path.split("\\").slice(1, -1);
  const parameters: RoutePathParameter[] = [];

  if (route.length === 0) {
    return {
      name: "/",
      regExp: /^\/$/,
      path,
      parameters,
    } as const;
  }

  const parts = route.map((parameter, idx) => {
    if (parameter.startsWith("{") && parameter.endsWith("}")) {
      parameters.push({ idx, key: parameter.slice(1, -1) });
      return "[^/]+";
    }
    return parameter;
  });
  const regExp = new RegExp(`^/${parts.join("/")}$`);

  return {
    name: join(...route),
    regExp,
    path,
    parameters,
  } as const;
}

export async function setupRoutes() {
  const iterateOverRoutes = walk("./routes", {
    match: [serverRegExp],
  });

  const routes = [];

  for await (const dirEntry of iterateOverRoutes) {
    const route = dirEntryToRoute(dirEntry);
    routes.push(route);
  }

  return { routes };
}
