import type { Day5DTO } from "$lib/models";

export const load = async ({ fetch }) => {

    const response = await fetch('/api/day-five');
    const data: Day5DTO = await response.json();

    return data;
};