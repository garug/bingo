import { redirect, type RequestEvent } from "@sveltejs/kit";

export async function load({ url, cookies }: RequestEvent) {
  const credential = cookies.get("credential");

  if (url.pathname !== "/" && !credential) return redirect(303, "/");

  return { credential, cookies: cookies.getAll() };
}
