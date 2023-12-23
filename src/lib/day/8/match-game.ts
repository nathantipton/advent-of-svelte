import { DEFAULT_GAME_OPTIONS, GameSize, type GameOptions, type GameState } from "$lib/models";
import { games } from "./games.server";


export class MatchGame {
    options: GameOptions;
    gameId: number | null = null;
    answers: number[] = [];
    gameArray: string[] = []; // Array of strings representing the game board _ = hidden, f = flipped, m = matched
    private _startTime: number = 0;
    private _state: GameState;

    constructor(gameString: string | undefined, options: GameOptions = DEFAULT_GAME_OPTIONS) {
        this.options = options;

        if (gameString) {
            // build game from string
            const [size, gameId, gameArray, startTime] = gameString.split('-');
            this.options.size = parseInt(size) as GameSize;
            this.gameId = parseInt(gameId);
            this.answers = games[parseInt(size) as GameSize][this.gameId];
            this.gameArray = gameArray.split('');
            this._state = this.getState();
            if (parseInt(startTime) > 0) {
                this._startTime = parseInt(startTime);
            }
        } else {
            // build new game
            this.gameId = Math.floor(Math.random() * games[this.options.size].length);
            this.answers = games[this.options.size][this.gameId];
            this.gameArray = Array.from({ length: this.answers.length }, () => '_');
            this._state = this.getState();
            this._startTime = 0;
        }


    }

    get size(): GameSize {
        return this.options.size;
    }

    get id(): number | null {
        return this.gameId;
    }

    get startTime(): number {
        return this._startTime;
    }

    get state(): GameState {
        return this._state;
    }

    getState(): GameState {
        if (this.gameArray.every((tile) => tile === 'm')) {
            return 'COMPLETED';
        } else if (this.gameArray.includes('f')) {
            return 'IN_PROGRESS';
        } else {
            return 'READY';
        }
    }

    flip(tile: number): void {

        // if this is the first tile flipped, start the timer
        if (this._startTime === 0) {
            this._startTime = Date.now();
        }

        if (this.gameArray[tile] !== 'm') {
            this.gameArray[tile] = 'f';
        }

        // get indices of flipped tiles
        const flippedCards = this.gameArray.map((tile, index) => tile === 'f' ? index : -1).filter((index) => index !== -1);

        if (flippedCards.length === 3) {
            // reset flipped tiles
            this.gameArray = this.gameArray.map((tile) => tile === 'f' ? '_' : tile);
            this.gameArray[tile] = 'f';
        }
        else if (flippedCards.length === 2) {
            // check for match
            this.checkForMatch(flippedCards[0], flippedCards[1])
        } else if (flippedCards.length > 2) {
            // reset flipped tiles something went wrong
            this.gameArray = this.gameArray.map((tile) => tile === 'f' ? '_' : tile);
        } else {
            // do nothing we're waiting for another tile to be flipped
        }
    }

    private checkForMatch(indexOne: number, indexTwo: number): void {
        if (this.answers[indexOne] === this.answers[indexTwo]) {
            this.gameArray[indexOne] = 'm';
            this.gameArray[indexTwo] = 'm';
        }
    }

    reset(): void {
        this.gameArray = Array.from({ length: this.answers.length }, () => '_');
    }

    toString(): string {
        // Format is "gameSize-gameIndex-gameArray"
        return `${this.options.size}-${this.gameId}-${this.gameArray.join('')}-${this.startTime}-${this.state}`;
    }
}