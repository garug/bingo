import { fetchApi } from "$lib/api";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const password = data.get("password");

    if (!password) return fail(422, { password: { error: "mandatory" } });

    const req = await fetchApi("/game", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (req.status !== 201) {
      return fail(req.status, { type: "api", error: req.statusText });
    }

    const response = await req.json();

    return redirect(303, `/admin/${response.id}`);
  },
} satisfies Actions;
