export type RoutePathParameter = Readonly<{
  idx: number;
  key: string;
}>;

export type Route = Readonly<{
  name: string;
  regExp: RegExp;
  path: string;
  parameters: RoutePathParameter[];
}>;

export function usePathParameters(req: Request, route: Route) {
  new Map();
}
