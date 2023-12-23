import { buildGame } from "$lib/day/8/game-builder";
import { GameSize } from "$lib/models";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
    const size: number = parseInt(params.size);
    const numberOfGames = 50;

    if (!Object.values(GameSize).includes(size)) {
        return error(400, `Invalid game size: ${size}, must be one of ${Object.values(GameSize)}`);
    }

    const gameArray = Array.from({ length: numberOfGames }, () => buildGame(size));

    return json(gameArray);
}

