import type { ListItem } from "$lib/models";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const LIST_URL = "https://advent.sveltesociety.dev/data/2023/day-one.json";

  const getSantasList = async (): Promise<ListItem[]> => {
    const list = await fetch(LIST_URL).then((res) => res.json());
    return list;
  };

  return {
    async: {
      list: getSantasList(),
    },
  };
};
