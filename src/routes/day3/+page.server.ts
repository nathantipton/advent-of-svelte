import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
    const URL = "https://advent.sveltesociety.dev/data/2023/day-three.json";

    const getPresents = async (): Promise<Present[]> => {
        type PresentWithoutId = Omit<Present, "id">;

        return fetch(URL)
            .then((res) => res.json())
            .then(
                (data: PresentWithoutId[]) =>
                    data.map((present, index) => {
                        return { ...present, id: index + 1 };
                    })
            );
    };


    return {
        presents: await getPresents(),
    }
}   