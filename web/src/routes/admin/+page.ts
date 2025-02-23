import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/game`);

  const games = await res.json();

  return {
    games,
  };
};
