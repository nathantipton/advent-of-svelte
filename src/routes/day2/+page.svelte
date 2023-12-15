<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";

  let count = $state(0);
  let mood = $state("🙁");

  let santaIsDed = $derived(count > 35);

  function increment() {
    count += 1;
  }

  function reset() {
    count = 0;
  }

  $effect(() => {
    if (count < 2) {
      mood = "🙁";
    } else if (count < 5) {
      mood = "😐";
    } else if (count < 10) {
      mood = "🙂";
    } else if (count < 15) {
      mood = "😃";
    } else if (count < 20) {
      mood = "😍";
    } else if (count < 25) {
      mood = "🤩";
    } else if (count < 30) {
      mood = "🤯";
    } else if (count < 35) {
      mood = "🤮";
    } else {
      mood = "💀";
    }
  });
</script>

<div class="flex flex-col gap-8" use:autoAnimate>
  <h2 class="text-2xl">Day 2 - Merry Munch-o-Meter</h2>
  <div
    class="flex flex-col justify-center items-center gap-12 w-full border p-8 rounded-xl bg-base-200"
  >
    <div class="flex flex-row flex-wrap items-start justify-between w-full gap-8">
      <div class="space-y-2">
        <h3 class="font-bold uppercase text-2xl md:text-4xl">🎅 <br/> Munch-o-Meter</h3>
        <p class="text-xs md:text-small">Tracking how many cookies Santa has eaten this Christmas</p>
      </div>
      <div class="flex flex-row items-center justify-end gap-4 w-full md:w-fit">
        <div
          class="flex flex-col flex-1 md:flex-auto gap-2 items-center justify-center aspect-square bg-base-300 w-32 rounded-xl"
        >
          Mood
          <span class="text-6xl">{mood}</span>
        </div>
        <div
          class="flex flex-col flex-1 md:flex-auto gap-2 items-center justify-center aspect-square bg-base-300 w-32 rounded-xl"
        >
          Cookies Eaten
          <span class="text-6xl">{count}</span>
        </div>
      </div>
    </div>
    {#if !santaIsDed}
      <button
        class="active:scale-95 origin-center transition-all"
        disabled={santaIsDed}
        on:click={increment}
      >
        <img
          class="w-48"
          alt="Cookie"
          src="https://advent.sveltesociety.dev/_app/immutable/assets/cookie.0e187f81.png"
        />
      </button>
    {:else}
      <img
        src="https://media4.giphy.com/media/3ohzdYJK1wAdPWVk88/giphy.gif"
        alt="Oops"
      />
    {/if}

    <button class="btn" on:click={reset}>Reset</button>
  </div>
</div>
