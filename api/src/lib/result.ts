export type ResultOk<T> = { type: "ok"; value?: T };

export type ResultError<T> = { type: "error"; error: T };

export type Result<T, E> = ResultOk<T> | ResultError<E>;

export function isResult<T, S, E>(
  obj: T
): obj is (Result<S, never> | Result<never, E>) & T {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  if (!("type" in obj)) {
    return false;
  }

  const isOk = obj.type === "ok" && "value" in obj;
  const isError = obj.type === "error" && "error" in obj;

  return isOk || isError;
}

export function Ok<T>(value?: T): Result<T, never> {
  if (isResult(value)) throw new Error("Result value cannot be a Result type");

  return { type: "ok", value };
}

export function Err<E>(error: E): Result<never, E> {
  if (isResult(error)) throw new Error("Result value cannot be a Result type");

  return { type: "error", error };
}

export type ResultStatus<T, E> = Result<T, E> & { status?: number };

export function OkStatus<T>(value?: T, status = 200): ResultStatus<T, never> {
  if (isResult(value)) throw new Error("Result value cannot be a Result type");

  return { type: "ok", status, value };
}

export function ErrStatus<E>(error: E, status = 500): ResultStatus<never, E> {
  if (isResult(error)) throw new Error("Result value cannot be a Result type");

  return { type: "error", status, error };
}

export function checkResults(results: Result<unknown, unknown>[]) {
  const groupedByType = results.reduce(
    (acc, curr) => {
      if (curr.type === "ok") {
        acc.ok.push(curr);
      } else {
        acc.errors.push(curr);
      }
      return acc;
    },
    { ok: [] as ResultOk<unknown>[], errors: [] as ResultError<unknown>[] }
  );

  return {
    Ok: () => groupedByType.errors.length === 0,
    errors: () => groupedByType.errors,
  };
}
