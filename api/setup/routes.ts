import type { WalkEntry } from "@std/fs";
import type { RoutePathParameter } from "@lib/routing.ts";
import { Route } from "@lib/routing.ts";
import { walk } from "@std/fs";
import { join, SEPARATOR } from "@std/path";

const serverRegExp = /(?<=.*)\+server\.ts\b/;

function buildApplicationRoutes(routes: Route[]) {
  return {
    routes,
    get: (str: string) => routes.find((e) => e.regExp.test(str)),
  };
}

function dirEntryToRoute(dirEntry: WalkEntry, rootLevel: number): Route {
  const path = dirEntry.path;
  const route = path.split(SEPARATOR).slice(rootLevel, -1);
  const parameters: RoutePathParameter[] = [];

  if (route.length === 0) {
    return {
      name: "/",
      regExp: /^\/$/,
      path,
      parameters,
    };
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
  };
}

const defaultRoutes = Deno.env.get("PATH_ROUTES")?.split(",") || [
  ".",
  "routes",
]; 

export async function setupRoutes(...path: string[]) {
  const iterateOverRoutes = walk(join(...(path || defaultRoutes)), {
    match: [serverRegExp],
  });

  const routes = [];

  for await (const dirEntry of iterateOverRoutes) {
    const pathLevels = path.slice(1).length;
    const route = dirEntryToRoute(dirEntry, pathLevels);
    console.log({ dirEntry, route });
    routes.push(route);
  }

  return buildApplicationRoutes(routes);
}
