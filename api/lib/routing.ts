export type RoutePathParameter = Readonly<{
  idx: number;
  key: string;
}>;

export type PathParameters = Record<string, string | undefined>;

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
