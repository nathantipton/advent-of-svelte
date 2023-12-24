import { MatchGame } from "$lib/day/8/match-game";
import { GameSize } from "$lib/models";
import type { Actions, PageServerLoad } from "./$types";

export const ssr = false;

export const load: PageServerLoad = async ({ cookies }) => {

    const existingGame = cookies.get('match-game');
    let game: MatchGame | null = null;

    if (existingGame) {
        game = new MatchGame(existingGame);
        return {
            game: {
                gameArray: game.gameArray,
                gameId: game.id,
                size: game.size,
                startTime: game.startTime,
                gameState: game.state
            },
        }
    }

    return {
        game: null
    }
}

export const actions: Actions = {
    flip: async ({ request, cookies }) => {
        const formData = await request.formData();

        const tile = formData.get('tile');

        const game = new MatchGame(cookies.get('match-game'));

        game.flip(parseInt(tile as string));

        cookies.set('match-game', game.toString(), { path: '' });

        return {}
    },

    reset: async ({ cookies }) => {
        const game = new MatchGame(cookies.get('match-game'));
        game.reset();
        cookies.set('match-game', game.toString(), { path: '' });

        return {}
    },

    newGame: async ({ cookies, request }) => {
        cookies.delete('match-game', { path: '' });

        const formData = await request.formData();
        const size = formData.get('size');

        const game = new MatchGame(undefined, { size: parseInt(size as string) as GameSize, isTimed: true });

        cookies.set('match-game', game.toString(), { path: '' });

        return {}
    },

    startOver: async ({ cookies }) => {
        cookies.delete('match-game', { path: '' });
        return {}
    }
}