import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/game/${params.game}`);

  const game = await res.json();

  return {
    id: params.game,
    game
  };
};
