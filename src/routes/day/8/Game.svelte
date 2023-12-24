<script lang="ts">
  import { enhance } from "$app/forms";
  import { GameSize, type GameState } from "$lib/models";
  import Timer from "./Timer.svelte";

  interface Props {
    gameArray: string[];
    gameId: number | null;
    size: GameSize;
    startTime: number;
    gameState: GameState;
  }

  const { gameArray, gameId, size, startTime, gameState } = $props<Props>();
  let gameOver = $state(false);
  let timeSinceStart = $state(0);
  let currentState = $state<GameState>("UNINITIALIZED");
  let timerInterval: number | null = null;

  const startTimer = () => {
    if (startTime === 0) {
      return;
    }
    timeSinceStart = Math.floor((Date.now() - startTime) / 1000);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
      timeSinceStart += 1;
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  $effect(() => {
    currentState = gameState;

    if (currentState === "UNINITIALIZED" || currentState === "READY") {
      stopTimer();
      timeSinceStart = 0;
    }

    if (currentState === "IN_PROGRESS") {
      startTimer();
    }

    if (currentState === "COMPLETED") {
      gameOver = true;
      stopTimer();
    }
  });

  const gridClasses = {
    [GameSize.Small]: "grid-cols-4 lg:grid-cols-6", // 12
    [GameSize.Medium]: "grid-cols-6 lg:grid-cols-8", // 24
    [GameSize.Large]: "grid-cols-6 md:grid-cols-9 lg:grid-cols-12 ", // 36
    [GameSize.Huge]: "grid-cols-6 sm:grid-cols-8 md:grid-cols-12", // 48
  };
</script>

<form
  use:enhance
  method="POST"
  class="absolute top-0 bottom-0 left-0 right-0 p-6 bg-base-100 flex flex-col items-stretch justify-start gap-4 container mx-auto"
>
  <input type="hidden" name="size" value={size} />
  <div class="flex flex-row justify-between items-center">
    <div>
      <h1 class="font-xmas text-primary text-4xl font-bold">Elf Match Game</h1>
    </div>
    <div class="flex flex-row justify-end items-center gap-4">
      <Timer seconds={timeSinceStart} />
      <button class="btn btn-ghost" formaction="?/reset"> Reset </button>
      <button class="btn" formaction="?/newGame"> New Game </button>
      <button class="btn btn-ghost" formaction="?/startOver">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
  </div>
  <div
    class="card-container flex-1 min-h-0 grid gap-4 py-8 w-full mx-auto {gridClasses[
      size
    ]}"
  >
    {#each gameArray as tile, index (index)}
      {@const url = `/api/day-eight/img/${size}/${gameId}/${index}/card.webp`}
      {@const flipped = tile === "f"}
      {@const matched = tile === "m"}

      <button
        class="overflow-hidden h-full rounded-xl md:rounded-2xl lg:rounded-3xl"
        formaction="?/flip"
        value={index}
        name="tile"
      >
        <img
          class=" object-contain h-full w-full"
          src={!flipped && !matched ? "/images/match-game/0.webp" : url}
          alt="Card Back"
        />
      </button>
    {/each}
  </div>

  <dialog id="my_modal_2" class="modal {gameOver ? 'modal-open' : ''}">
    <div class="modal-box flex flex-col items-center">
      <h3 class="font-bold text-lg">You Won!</h3>
      <p class="py-4">Great job, the cards are all matched up!</p>
      <p class="text-2xl"><Timer seconds={timeSinceStart} /></p>
      <div class="modal-action">
        <button
          class="btn btn-lg btn-ghost flex-1"
          formaction="?/startOver"
          on:click={() => (gameOver = false)}
        >
          Close
        </button>
        <button
          class="btn btn-lg flex-1"
          formaction="?/newGame"
          on:click={() => (gameOver = false)}
        >
          New Game
        </button>
      </div>
    </div>
  </dialog>
</form>
