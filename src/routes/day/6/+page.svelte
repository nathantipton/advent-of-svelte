<script lang="ts">
  import { SONG_CHOICES, type Song } from "$lib/models";
  import { onDestroy, onMount } from "svelte";
  import YouTube from "youtube-player";
  import PlayerStates from "youtube-player/dist/constants/PlayerStates";
  import type { YouTubePlayer } from "youtube-player/dist/types";

  let currentBPM = $state<number | null>(null);
  let variance = $state<number | null>(null);
  let varianceDirection = $state<"fast" | "slow" | "">("");
  let varianceClass = $state<string>("");
  let targetBPM = $state<number>(0);

  let timestamp1 = $state<number | null>(null);
  let timestamp2 = $state<number | null>(null);
  let song: Song | null = $state(null);
  let playerState = $state<PlayerStates>(0);
  let player: YouTubePlayer | null = null;

  onMount(() => {
    player = YouTube("player", {
      videoId: song?.youtubeId ?? "aAkMkVFwAoo",
      height: "100%",
      width: "100%",
      playerVars: {
        start: song?.startTime ?? 0,
      },
    });

    player.on("stateChange", (event) => {
      playerState = event.data;
    });

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      player?.destroy();
    };
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      addBeat();
    }
  };

  const handleButtonClick = () => {
    addBeat();
  };

  const addBeat = () => {
    timestamp2 = timestamp1;
    timestamp1 = Date.now();
    if (!timestamp2) return;
    calculateBPM();
  };

  const calculateBPM = () => {
    if (!timestamp1 || !timestamp2) return;
    const timePassed = timestamp1 - timestamp2;
    currentBPM = (1 / (timePassed / 1000)) * 60;
    variance = Math.abs(currentBPM - targetBPM);
    varianceDirection = currentBPM > targetBPM ? "fast" : "slow";
    varianceDirection = currentBPM === targetBPM ? "" : varianceDirection;
  };

  const reset = () => {
    timestamp1 = null;
    timestamp2 = null;
    currentBPM = null;
    variance = 0;
  };

  const pause = () => {
    player?.pauseVideo();
  };

  const play = () => {
    player?.playVideo();
    player?.getPlayerState();
  };

  const handleSongSelection = (
    event: Event & { currentTarget: EventTarget & HTMLSelectElement }
  ) => {
    reset();
    const selectedSongId = parseInt(event.currentTarget.value);
    song = SONG_CHOICES.find((song) => song.id === selectedSongId) ?? null;
    targetBPM = song?.targetBpm ?? 150;
    if (!player) return;
    player.loadVideoById({
      videoId: song?.youtubeId ?? "",
      startSeconds: song?.startTime ?? 0,
    });
    document.getElementById("song-select")?.blur();
    startGame();
  };

  const startGame = () => {
    player?.playVideo();
  };

  $effect(() => {
    if (!variance) return;

    if (variance > 20) {
      varianceClass = "text-primary";
    } else if (variance > 10) {
      varianceClass = "text-yellow-500";
    } else {
      varianceClass = "text-green-500";
    }
  });
</script>

<svelte:head>
  <title>Day 6 | Advent of Svelte 2023</title>
</svelte:head>

<div
  class="absolute top-0 bottom-0 left-0 right-0 bg-base-100 -z-20"
  id="player"
></div>
<div
  class="absolute top-0 bottom-0 left-0 right-0 bg-base-100 bg-opacity-70 -z-10"
></div>
<div
  class="absolute container mx-auto top-6 px-4 md:px-0 bottom-0 left-0 right-0 z-10 flex flex-col items-stretch justify-start"
>
  <div
    class="flex flex-row flex-wrap items-center justify-center md:justify-between pt-28"
  >
    <div>
      <h1 class="font-bold text-2xl">Elf Metronome</h1>
      <p class="mb-4 text-sm">
        Select your song and then use the button or your <kbd
          class="border border-base-300 rounded-md p-1"
        >
          SPACEBAR</kbd
        > to try to keep the beat.
      </p>
    </div>

    <div class="flex flex-row items-center gap-2">
      {#if song}
        <select
          id="song-select"
          class="select select-bordered w-full max-w-xs"
          on:change={handleSongSelection}
        >
          <option disabled selected>Pick your song</option>
          {#each SONG_CHOICES as song (song.id)}
            <option value={song.id}>{song.title} - {song.artist}</option>
          {/each}
        </select>
      {/if}
    </div>
  </div>

  <div class="flex-1 flex flex-col items-center justify-center">
    {#if song}
      <div class="flex flex-col items-center justify-center gap-4">
        <div class="font-semibold text-content-300 uppercase text-sm">
          Target {targetBPM} BPM
        </div>
        <div class="flex flex-row items-baseline justify-center gap-2">
          <div class="text-8xl font-semibold text-base-content">
            {currentBPM?.toFixed(0) ?? "-"}
          </div>
          <div class="text-xl font-semibold text-content-300 text-opacity-30">
            BPM
          </div>
        </div>

        <div>
          {#if variance}
            {#if varianceDirection === "fast"}
              <i class="fa-solid fa-arrow-up {varianceClass} fa-lg mr-2"></i>
              {variance.toFixed(0)} fast
            {:else if varianceDirection === "slow"}
              <i class="fa-solid fa-arrow-down {varianceClass} fa-lg mr-2"></i>
              {variance.toFixed(0)} slow
            {:else}
              <i class="fa-solid fa-check text-content-300 mr-2"></i> Nice work!
            {/if}
          {/if}
        </div>
      </div>
    {:else}
      <select
        id="song-select"
        class="select select-lg select-bordered w-full max-w-lg"
        on:change={handleSongSelection}
      >
        <option disabled selected>Pick your song</option>
        {#each SONG_CHOICES as song (song.id)}
          <option value={song.id}>{song.title} - {song.artist}</option>
        {/each}
      </select>
    {/if}
  </div>
  <div class="flex flex-col items-center justify-center gap-4 pb-12">
    {#if song}
      <button
        on:click={handleButtonClick}
        class="btn btn-lg bg-primary hover:bg-red-800 text-white h-36 w-36 btn-circle btn-glow uppercase font-bold"
      >
        Tap
      </button>

      <div class="flex flex-row items-center justify-center gap-2">
        {#if song}
          <button
            class="btn btn-square btn-ghost"
            disabled={!song}
            on:click={reset}
          >
            RESET
          </button>
        {/if}
        {#if playerState === 1}
          <button
            class="btn btn-square btn-ghost"
            disabled={!song}
            on:click={pause}
          >
            <i class="fa-solid fa-pause"></i>
          </button>
        {:else}
          <button
            class="btn btn-square btn-ghost"
            disabled={!song}
            on:click={play}
          >
            <i class="fa-solid fa-play"></i>
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>
