<script lang="ts">
  import type { PageData } from "./$types";
  import Game from "./Game.svelte";

  export let data: PageData;
  $: ({ gameArray, gameId, size, startTime, gameState } = data);
</script>

<Game {gameArray} {gameId} {size} {startTime} {gameState}></Game>
