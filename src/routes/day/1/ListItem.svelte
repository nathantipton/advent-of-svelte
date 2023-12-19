<script lang="ts">
  import type { ListItem } from "$lib/models";
  import NaughtyOrNiceIcon from "./NaughtyOrNiceIcon.svelte";

  const { item } = $props<{ item: ListItem }>();
  const { name, tally } = item;
</script>

<div
  class="aspect-square flex flex-col items-center justify-center border border-base-300 bg-base-200 shadow-lg rounded-xl gap-4"
>
  <h3 class="font-bold uppercase">{name}</h3>
  <div class="text-6xl"><NaughtyOrNiceIcon {tally}></NaughtyOrNiceIcon></div>
</div>
