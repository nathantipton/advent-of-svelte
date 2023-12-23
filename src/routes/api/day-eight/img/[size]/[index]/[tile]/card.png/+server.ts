import { games } from "$lib/day/8/games.server";
import { GameSize } from "$lib/models";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, fetch }) => {
    const size: number = parseInt(params.size);
    const index: number = parseInt(params.index);
    const tile: number = parseInt(params.tile);

    if (isNaN(size) || !Object.values(GameSize).includes(size) || isNaN(index) || index < 0 || index > 49 || isNaN(tile)) {
        return error(404, "")
    }

    const game = games[size as GameSize][index];

    if (!game) {
        return error(404, "");
    }

    const number = game[tile];

    if (isNaN(number) || number < 0 || number > 24) {
        return error(404, "");
    }

    const response = await fetch(`/images/match-game/${number}.png`);
    
    return response;
};