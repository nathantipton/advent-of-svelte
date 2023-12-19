<script lang="ts">
  import ListItem from "./ListItem.svelte";
  export let data;
  const { async } = data;
</script>

<svelte:head>
  <title>Day 1 | Advent of Svelte 2023</title>
</svelte:head>

<div class="flex flex-col gap-8">
  <h2 class="text-2xl">Day 1 - Santa's Naughty or Nice List</h2>

  {#await async.list}
    <div>Fetching Santa's List</div>
  {:then list}
    <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2">
      {#each list as item}
        <ListItem {item}></ListItem>
      {/each}
    </div>
  {:catch error}
    <div>Error: {error.message}</div>
  {/await}
</div>
