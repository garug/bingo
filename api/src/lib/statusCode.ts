const knownErrors = new Map();

knownErrors.set("forbbiden", 403);
knownErrors.set("unauthorized", 401);
knownErrors.set("not_found", 404);
knownErrors.set("internal", 500);

export function statusCode(str: string): number {
  return knownErrors.get(str.toLowerCase());
}