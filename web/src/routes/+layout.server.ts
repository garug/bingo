import type { RequestEvent } from "@sveltejs/kit";

export async function load({ cookies }: RequestEvent) {
  const credential = cookies.get("credential");

  return { credential, cookies: cookies.getAll() };
}
