import { json, text } from "@sveltejs/kit";

// export async function POST({ request }) {
//   console.log(request);
//   return json("iha");
// }

export const actions = {
  default: async (event) => {
    console.log(event);
  },
};
