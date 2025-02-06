import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ fetch, request }) => {
    const data = await request.formData();
    const password = data.get("password");

    if (!password) return fail(422, { password: { error: "mandatory" } });

    const req = await fetch("/api/game", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (req.status !== 201) {
      const error = await req.json();
      return fail(req.status, { type: "api", error });
    }

    const response = await req.json();

    return redirect(303, `/admin/${response.id}`);
  },
} satisfies Actions;
