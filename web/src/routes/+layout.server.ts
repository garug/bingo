import type { RequestEvent } from "@sveltejs/kit";

export async function load({ cookies }: RequestEvent) {
  const credential = cookies.get("credential");

  console.log({ cookies: cookies.getAll() });

  return { credential, cookies: cookies.getAll() };
}
