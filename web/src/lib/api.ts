export async function fetchApi(path: string, init?: RequestInit, f = fetch) {
  return f(`${import.meta.env.VITE_API_URL || ""}${path}`, init);
}
