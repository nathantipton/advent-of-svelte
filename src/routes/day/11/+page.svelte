<script lang="ts">
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";

  let elfName: string | null = $state(null);
</script>

<svelte:head>
  <title>Day 11 | Advent of Svelte 2023</title>
</svelte:head>

<div class="container mx-auto max-w-2xl flex flex-col justify-start items-center gap-4 py-8">
<h1 class="text-5xl font-bold text-primary font-xmas">Elf Name Generator</h1>
  <p class="text-center max-w-xs">Type in your name to generate your Elf name! Using sophiticated matching techinques we will find your perfect name.</p>
  <form
  class=" flex flex-col items-stretch gap-4"
    action="?/generate"
    method="post"
    use:enhance={() => {
      return async ({ result }) => {
        if (result.type === "success") {
          elfName = result.data?.elfName as string || "Olaf the Red-Nosed Reindeer";
        }
      };
    }}
  >
    <input
      class="input input-bordered"
      placeholder="First and last name"
      type="text"
      name="name"
      minlength="4"
    />
    <button type="submit" class="btn btn-primary">Generate</button>
  </form>

  {#if (elfName)}
  <div in:fade class="bg-base-200 border rounded-xl border-base-300 py-4 px-8 flex flex-col items-center gap-4">
    <div class="uppercase text-content-300">Your Elf Name is</div>
    <h2 class="text-4xl font-bold text-secondary font-xmas">{elfName}</h2>
  </div>
    {/if}
</div>
