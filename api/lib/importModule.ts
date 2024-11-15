import { RouteModule } from "@lib/routing.ts";

type ImportModuleResponse = Promise<"not_found" | "internal" | RouteModule>;

export async function importModule(path: string): ImportModuleResponse {
  try {
    return await import(`../${path}`);
  } catch (error) {
    if (isModuleNotFoundError(error)) return "not_found";

    console.error("Unexpected error during module import:", error);
    return "internal";
  }
}

function isModuleNotFoundError(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === "ERR_MODULE_NOT_FOUND"
  );
}
