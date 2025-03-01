import { logger } from "@lib/logger.ts";
import { Result } from "@lib/result.ts";

type Status = {
  status?: number;
};

const headers = new Headers({
  "Access-Control-Allow-Origin": "*",
  // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  // "Content-Encoding": "gzip"
});

export function handleResponse<T, E>(result: Result<T, E> & Status) {
  const data = result.type === "ok" ? result.value : { error: result.error };

  const status = result.status || (result.type === "ok" ? 200 : 400);

  logger.http({ ...data });

  return Response.json(data, { status, headers });
}

export function createResponse(message: string, status: number) {
  return new Response(message, { status, headers });
}
