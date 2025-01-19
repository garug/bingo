export async function fetchApi(path: string, init?: RequestInit) {
  return fetch(`${import.meta.env.VITE_API_URL || ""}${path}`, init);
}
