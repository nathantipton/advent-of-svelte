<script lang="ts">
  let progress = $state(3);
</script>

<ul class="flex flex-wrap">
  {#each Array.from({ length: 25 }, (_, i) => i + 1) as day}
    <li class="w-1/2 md:w-1/4 lg:w-1/6 p-2">
      <svelte:element
        this={day <= progress ? "a" : "div"}
        class="day-link"
        href={`/day${day}`}
      >
        Day {day}
        <span class="ml-2">
          {#if day > progress}
            🔒
          {:else}
            ✅
          {/if}
        </span>
      </svelte:element>
    </li>
  {/each}
</ul>

<style lang="postcss">
  .day-link {
    @apply block border bg-base-200 border-base-300 rounded p-4 text-center;
  }

  a.day-link {
    @apply hover:bg-base-200;
  }

  div.day-link {
    @apply opacity-30 cursor-not-allowed;
  }
</style>
