import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const [sessionRes, gameRes] = await Promise.all([
    fetch(`/api/sessions/${params.id}`),
    fetch(`/api/game/${params.id}`),
  ]);

  const [session, game] = await Promise.all([
    sessionRes.json(),
    gameRes.json(),
  ]);

  return { session, game };
};
