<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import PresentCard from "./PresentCard.svelte";
  import toast from "svelte-french-toast";

  interface Props {
    data: {
      presents: Present[];
    };
  }
  const { data } = $props<Props>();

  let presentsInSleigh = $state<Present[]>([]);
  let presentsOnShelf = $state<Present[]>(data.presents);

  let weight = $derived(
    presentsInSleigh.reduce((acc, present) => acc + present.weight, 0)
  );

  let weightRemaining = $derived(100 - weight);

  function onDragOver(event: any) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent, target: "sleigh" | "shelf") {
    event.preventDefault();
    const data = event.dataTransfer?.getData("text");
    if (!data) return;
    const present = JSON.parse(data);
    if (target === "sleigh" && weight + present.weight > 100) {
      toast.error("Sleigh is too heavy!");
      return;
    }
    handlePresentDrop(present, target);
  }

  function handlePresentDrop(present: Present, target: "sleigh" | "shelf") {
    if (target === "sleigh") {
      presentsInSleigh = [...presentsInSleigh, present];
      presentsOnShelf = presentsOnShelf.filter((p) => p.id !== present.id);
    } else {
      presentsOnShelf = [...presentsOnShelf, present];
      presentsInSleigh = presentsInSleigh.filter((p) => p.id !== present.id);
    }
  }
</script>

<div class="flex flex-col gap-8">
  <h2 class="text-2xl">Day 3 - Jingle Bell Balancer</h2>
  <div class="bg-base-200 rounded-xl flex flex-col p-8 gap-8">
    <div class="flex flex-col gap-4 text-center">
      <div>
        <h2 class="font-bold text-3xl">Santa's Sleigh</h2>
        <p class="text-sm">
          Santa's sleigh can only hold 100kg. Help him load the sleigh
          effectively.
        </p>
      </div>
      <div>
        Weight: <span class="text-2xl font-bold">{weight.toFixed(2)} kg</span>
      </div>
      <div>
        {#if weight > 85}
          Almost full! Only {weightRemaining.toFixed(2)} kg left.
        {/if}
      </div>
    </div>

    <div
      on:dragover={onDragOver}
      on:drop={(event) => onDrop(event, "sleigh")}
      role="listbox"
      tabindex="0"
      class="drop-area flex flex-col justify-center items-center h-full bg-base-300 p-8 min-h-[240px] rounded"
    >
      {#if presentsInSleigh.length === 0}
        Drop the presents here
      {/if}
      <div class="flex flex-row flex-wrap gap-4 items-center justify-center">
        {#each presentsInSleigh as present (present.id)}
          <PresentCard {present}></PresentCard>
        {/each}
      </div>
    </div>
  </div>

  <div
    on:dragover={onDragOver}
    on:drop={(event) => onDrop(event, "shelf")}
    role="listbox"
    tabindex="0"
    class="flex flex-row flex-wrap gap-4 items-center justify-center"
    use:autoAnimate
  >
    {#each presentsOnShelf as present (present.id)}
      <PresentCard {present}></PresentCard>
    {/each}
  </div>
</div>
