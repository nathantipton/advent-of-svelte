<script lang="ts">
  import { SONG_CHOICES, type Song } from "$lib/models";
  import { onMount } from "svelte";
  import YouTube from "youtube-player";
  import type { YouTubePlayer } from "youtube-player/dist/types";

  let bpm = $state(0);
  let variance = $state(0);
  let timePassed = $state(0);
  let targetBPM = $state(150);
  let gameMessage = $state("");
  let diffMessage = $state("");
  let song: Song | null = $state(null);
  let player: YouTubePlayer | null = null;

  onMount(() => {
    player = YouTube("player", {
      height: "390",
      width: "640",
      videoId: song?.youtubeId ?? "",
      playerVars: {
        autoplay: 1,
        start: song?.startTime ?? 0,
      },
    });
  });

  // Array of timestamps
  let beatHistory = $state<number[]>([]);

  const differenceMessages = {
    0: "Perfect",
    1: "Slightly off",
    2: "Off",
    3: "Very off",
    4: "Way off",
    5: "Terrible",
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      console.log("Space pressed");
      beatHistory.push(Date.now());
      calculateBPM();
    }
  };

  const calculateBPM = () => {
    if (beatHistory.length < 2) return;
    const lastBeat = beatHistory[beatHistory.length - 1];
    const firstBeat = beatHistory[0];
    timePassed = lastBeat - firstBeat;
    bpm = (beatHistory.length / timePassed) * 60000;

    // calculate variance of the last 10 beats with standard deviation
    const lastTenBeats = beatHistory.slice(-10);
    const averageBPM =
      lastTenBeats.reduce((a, b) => a + b) / lastTenBeats.length;
    const varianceSum = lastTenBeats.reduce(
      (a, b) => a + Math.pow(b - averageBPM, 2),
      0
    );
    variance = Math.sqrt(varianceSum / lastTenBeats.length) / 1000;

    // calculate message
    const difference = Math.abs(bpm - targetBPM);
    if (difference < 1) {
      diffMessage = differenceMessages[0];
    } else if (difference < 5) {
      diffMessage = differenceMessages[1];
    } else if (difference < 10) {
      diffMessage = differenceMessages[2];
    } else if (difference < 20) {
      diffMessage = differenceMessages[3];
    } else if (difference < 30) {
      diffMessage = differenceMessages[4];
    } else {
      diffMessage = differenceMessages[5];
    }
  };

  const reset = () => {
    beatHistory = [];
    bpm = 0;
    variance = 0;
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
    gameMessage = "Press spacebar to the beat!";
  };
</script>

<div class="container mx-auto max-w-4xl">
  <h1 class="text-primary font-bold text-2xl mb-4">Elf Metronome</h1>
  <div
    class="bg-base-200 p-8 rounded-xl flex flex-col items-center justify-center gap-8"
  >
    <div class="flex flex-row justify-between items-center w-full">
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
      <div class="flex flex-row items-center gap-2">
        {#if song}
          <div>
            <button class="btn btn-outline" on:click={reset}>Reset</button>
          </div>
        {/if}
      </div>
    </div>
    <div class="-my-4 text-sm">{gameMessage}</div>
    <div class="bg-base-100 py-6 px-8 rounded-xl flex-col flex gap-4">
      <div class="flex flex-col items-center justify-center">
        <div class="text-xs font-bold uppercase mb-2">Target: {targetBPM}</div>
        <div class="text-xs font-bold uppercase">Your BPM</div>
        <div class="text-6xl">{bpm.toFixed(0)}</div>
        <div>{diffMessage}</div>
      </div>

      <div class="flex flex-row items-center justify-center text-xs gap-4">
        <div>
          Variance: {variance.toFixed(0)} bpm
        </div>
        <div>
          Time passed: {(timePassed / 1000).toFixed(0)} seconds
        </div>
        <div>
          Total beats recorded: {beatHistory.length}
        </div>
      </div>
    </div>
    <div>
      <div id="player"></div>
    </div>
  </div>
</div>
