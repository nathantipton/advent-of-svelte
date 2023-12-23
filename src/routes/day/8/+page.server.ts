import { MatchGame } from "$lib/day/8/match-game";
import { GameSize } from "$lib/models";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {

    const existingGame = cookies.get('match-game');
    let game: MatchGame;

    if (existingGame) {
        game = new MatchGame(existingGame);
    } else {
        game = new MatchGame(undefined, { size: GameSize.Medium, isTimed: false });
        cookies.set('match-game', game.toString(), { path: '' });
    }

    return {
        gameArray: game.gameArray,
        gameId: game.id,
        size: game.size,
        startTime: game.startTime,
        gameState: game.state
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

    // TODO: make size configurable
    newGame: async ({ cookies }) => {
        cookies.delete('match-game', { path: '' });
        const game = new MatchGame(undefined, { size: GameSize.Small, isTimed: false });
        cookies.set('match-game', game.toString(), { path: '' });

        return {}
    }
}