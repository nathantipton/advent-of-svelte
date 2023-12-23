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
</script>

<form
  use:enhance
  method="POST"
  class="container mx-auto flex flex-col items-stretch justify-start gap-4 h-content-full"
>
  <div class="flex flex-row justify-between items-center">
    <div>
      <h1 class="font-xmas text-primary text-4xl font-bold">Elf Match Game</h1>
    </div>
    <div class="flex flex-row justify-end items-center gap-4">
      <Timer seconds={timeSinceStart} />
      <button class="btn btn-ghost" formaction="?/reset"> Reset </button>
      <button class="btn" formaction="?/newGame"> New Game </button>
    </div>
  </div>
  <div
    class="flex-1 grid grid-cols-4 grid-rows-3 md:{size > 14
      ? 'grid-cols-6'
      : ''} gap-8 py-8 w-fit mx-auto"
  >
    {#each gameArray as tile, index}
      {@const url = `/api/day-eight/img/${size}/${gameId}/${index}/card.png`}
      {@const flipped = tile === "f"}
      {@const matched = tile === "m"}
      <div class="flex flex-col items-center justify-center h-full w-full">
        <button
          class="bg-cover border border-base-300 bg-base-200 rounded-xl flex flex-col items-center justify-center min-w-[140px] h-full aspect-[166/247]"
          formaction="?/flip"
          value={index}
          name="tile"
          style:background-image={flipped || matched ? `url(${url})` : ``}
        >
          {#if !flipped && !matched}
            <span>
              <i class="fa-solid fa-snowflake text-6xl opacity-10"></i>
            </span>
          {/if}
        </button>
      </div>
    {/each}
  </div>

  <dialog id="my_modal_2" class="modal {gameOver ? 'modal-open' : ''}">
    <div class="modal-box flex flex-col items-center">
      <h3 class="font-bold text-lg">You Won!</h3>
      <p class="py-4">Great job, the cards are all matched up!</p>
      <p class="text-2xl"><Timer seconds={timeSinceStart} /></p>
      <div class="modal-action">
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
