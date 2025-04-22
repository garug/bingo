import type { Actions, RequestEvent } from './$types';
import { fail, redirect } from "@sveltejs/kit";

const successCodes = [200, 201]

async function join({ request, fetch }: RequestEvent) {
    const data = await request.formData();
    const code = data.get("code");

    if (!code) return fail(422, { error: "code is mandatory" });

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
}

async function newGame({ request, fetch }: RequestEvent) {
    const data = await request.formData();
    const code = data.get("code");

    if (!code) return fail(422, { error: "code is mandatory" });

    const req = await fetch("/api/game", {
        method: "POST",
        body: JSON.stringify({ code }),
    });

    if (req.status !== 201) {
        const error = await req.json();
        return fail(req.status, { type: "api", ...error });
    }

    const response = await req.json();

    return redirect(303, `/admin/${response.id}`);
}

export const actions = {
    join,
    new: newGame,
} satisfies Actions;