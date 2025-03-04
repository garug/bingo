import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

const successCodes = [200, 201]

export const actions = {
  default: async ({ fetch, request }) => {
    const data = await request.formData();
    const code = data.get("code");

    if (!code) return fail(422, { code: { error: "mandatory" } });

    const req = await fetch("/api/game/join", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    if (!successCodes.includes(req.status)) {
      const error = await req.json();
      return fail(req.status, { type: "api", ...error });
    }

    const response = await req.json();

    return redirect(303, `/game/${response.id}`);
  },
} satisfies Actions;
