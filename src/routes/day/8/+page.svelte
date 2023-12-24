<script lang="ts">
  import { enhance } from "$app/forms";
  import { GameSize, type GameState } from "$lib/models";
  import type { PageData } from "./$types";
  import Game from "./Game.svelte";

  export let data: PageData;
  $:({ game } = data);
  let gameSize = GameSize.Small;

  const gameSizeOptions = Object.keys(GameSize)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: GameSize[key as keyof typeof GameSize],
    }));

</script>

<svelte:head>
  <title>Day 8 | Advent of Svelte 2023</title>
</svelte:head>


{#if game?.gameArray}
  <Game {...game}></Game>
{:else}
  <form
    use:enhance
    method="post"
    action="?/newGame"
    class="flex flex-col items-center justify-start gap-8"
  >
    <h1 class="font-xmas text-primary text-4xl font-bold">Elf Match Game</h1>

    <h3 class="font-bold text-2xl">Start a new game</h3>

    <div class="grid grid-cols-2 gap-4">
      {#each gameSizeOptions as option}
        <label
          class="gap-2 flex flex-col justify-start items-start border border-base-300 p-4 rounded cursor-pointer transition-all hover:bg-base-200"
          class:border-white={gameSize === option.value}
          class:bg-base-200={gameSize === option.value}
        >
          <input
            hidden
            type="radio"
            name="size"
            value={option.value}
            checked={gameSize === option.value}
            on:change={() => (gameSize = option.value)}
          />
          <div>{option.label} - {option.value} Cards</div>
        </label>
      {/each}
    </div>

    <button class="btn btn-lg btn-primary">Start</button>
  </form>
{/if}
