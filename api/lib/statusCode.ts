const knownErrors = new Map();

knownErrors.set("forbbiden", 403);
knownErrors.set("unauthorized", 401);

export function statusCode(str: string): number {
  return knownErrors.get(str.toLowerCase()) || 400;
}

export class HttpResponses {
  static INTERNAL = new Response("Internal server error", {
    status: 500,
  });

  static NOT_FOUND = new Response("Not found", {
    status: 404,
  });

  static NOT_IMPLEMENTED = new Response("Method not implemented", {
    status: 501,
  });
}
