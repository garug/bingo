const knownErrors = new Map();

knownErrors.set("forbbiden", 403);
knownErrors.set("unauthorized", 401);
knownErrors.set("not_found", 404);
knownErrors.set("internal", 500);

export function statusCode(str: string): number {
  return knownErrors.get(str.toLowerCase()) || 400;
}

export class HttpResponses {
  static fromString = (str: string) => {
    return new Response(str, {
      status: statusCode(str),
    });
  };

  static INTERNAL = () =>
    new Response("Internal server error", {
      status: 500,
    });

  static NOT_ACCEPTABLE = (cause: string) =>
    Response.json(
      { cause },
      {
        status: 422,
      }
    );

  static NOT_FOUND = (data = {}) =>
    Response.json(data, {
      status: 404,
    });

  static NOT_IMPLEMENTED = () =>
    new Response("Method not implemented", {
      status: 501,
    });
}
