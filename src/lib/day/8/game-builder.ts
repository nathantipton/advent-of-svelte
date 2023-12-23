import type { GameSize } from "$lib/models";

/**
 * Builds a game board with the given number of tiles.
 * Using this to populate games.server.ts for the matching game.
 */
export const buildGame = (numberOfTiles: GameSize) => {
    let gameBoard: number[] = [];
    let numbers = new Set<number>();

    // get 12 random numbers between 1 and 24 that are unique
    while (numbers.size < numberOfTiles / 2) {
        numbers.add(Math.floor(Math.random() * 24) + 1);
    }

    // add each number twice to the game board
    numbers.forEach(number => {
        gameBoard.push(number);
        gameBoard.push(number);
    });

    // shuffle the game board
    gameBoard.sort(() => Math.random() - 0.5);

    return gameBoard;
}