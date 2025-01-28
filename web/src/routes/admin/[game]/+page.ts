import { fetchApi } from "$lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetchApi(`/game/${params.game}`, {}, fetch);

  const game = await res.json();

  return {
    id: params.game,
    game,
  };
};
