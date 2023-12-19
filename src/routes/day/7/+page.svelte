<script lang="ts">
  import { MorseCodePlayer } from "$lib/day/6/morse-code-player";
  import { MorseCodeTranslator } from "$lib/day/6/morse-code-translator";
  import { onMount } from "svelte";

  let translatedMessage = $state("");
  let isPlaying = $state(false);
  let message = $state("");
  let morsePlayer: MorseCodePlayer | null = null;
  let morseCodeTranslator: MorseCodeTranslator | null = null;

  onMount(() => {
    morsePlayer = new MorseCodePlayer();
    morseCodeTranslator = new MorseCodeTranslator();

    morsePlayer.onStateChange((state) => {
      console.log("state", state);
      isPlaying = state;
    });
  });

  const handleTranslate = () => {
    if (!morseCodeTranslator) return;
    const result = morseCodeTranslator.textToMorse(message);
    translatedMessage = result;
  };

  const play = () => {
    if (!morsePlayer) return;
    morsePlayer.play(translatedMessage);
  };

  const stop = () => {
    if (!morsePlayer) return;
    morsePlayer.stop();
  };
</script>

<div
  class="container mx-auto max-w-2xl bg-base-200 rounded-xl p-8 flex flex-col items-stretch justify-start gap-8"
>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 bg-morse-code bg-center -z-10 opacity-10"
  ></div>
  <div class="flex flex-col items-stretch justify-start gap-4 text-center z-10">
    <h1 class="text-3xl font-bold font-xmas text-red-500">Morse Mischief</h1>
    <p class="text-sm">
      Building on the success of the recent North Pole technological
      initiatives, Santa has encountered a unique communication challenge. He
      needs to connect with Sven, one of his top reindeer trainers based in
      Iceland. However, with the sleigh currently unavailable, Santa must resort
      to a more unconventional method of communication. Sven, known for his
      eccentric but effective training methods, swears by the use of Morse code,
      believing it keeps his reindeer more alert and attentive (he insists they
      respond better to beeps and boops).
    </p>
  </div>
  <div class="flex flex-row items-center justify-between gap-4">
    <input
      id="message"
      name="message"
      class="input input-bordered max-w-3xl w-full"
      bind:value={message}
      type="text"
      placeholder="Write your message to send to Sven"
    />
    <div>
      <button class="btn btn-secondary" on:click={handleTranslate}
        >Translate</button
      >
    </div>
  </div>
  {#if translatedMessage}
    <div class="flex flex-col items-center justify-center gap-4">
      <h3 class="text-xl">Morse Code</h3>
      <p class="text-3xl bg-base-100 py-3 px-6 rounded-xl">
        {translatedMessage}
      </p>
      <div>
        {#if isPlaying}
          <button class="btn btn-square btn-ghost" on:click={stop}>
            <i class="fa-solid fa-stop"></i>
          </button>
        {:else}
          <button class="btn btn-ghost" on:click={play}>
            <i class="fa-solid fa-play"></i>
            Play for Sven
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>
