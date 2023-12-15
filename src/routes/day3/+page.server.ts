import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
    const URL = "https://advent.sveltesociety.dev/data/2023/day-three.json";

    const getPresents = async (): Promise<Present[]> => {
        type PresentWithoutId = Omit<Present, "id">;

        return await fetch(URL)
            .then((res) => res.json())
            .then(
                (data) => data.map(
                    (present: PresentWithoutId, index: number) => {
                        return {
                            id: index + 1,
                            ...present,
                        };
                    }
                )
            );
    };


    return {
        presents: await getPresents(),
    }
}   