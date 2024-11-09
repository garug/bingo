export type RoutePathParameter = Readonly<{
  idx: number;
  key: string;
}>;

export type PathParameters = Record<string, string | undefined>;

export type QueryParameters = Record<string, string | string[] | undefined>;

export type Route = Readonly<{
  name: string;
  regExp: RegExp;
  path: string;
  parameters: RoutePathParameter[];
}>;

export function usePathParameters(req: Request, route: Route) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/").slice(1);

  return route.parameters.reduce<PathParameters>((acc, param) => {
    acc[param.key] = pathSegments[param.idx];
    return acc;
  }, {});
}

export function useQueryParameters(req: Request) {
  const url = new URL(req.url);
  const parameters: QueryParameters = {};

  for (const [key, value] of url.searchParams.entries()) {
    if (parameters[key] === undefined) {
      parameters[key] = value;
    } else if (typeof parameters[key] === "string") {
      parameters[key] = [parameters[key] as string, value];
    } else {
      (parameters[key] as string[]).push(value);
    }
  }

  return parameters;
}
