const knownErrors = new Map();

knownErrors.set("forbbiden", 403);
knownErrors.set("unauthorized", 401);

export function statusCode(str: string): number {
  return knownErrors.get(str.toLowerCase()) || 400;
}
