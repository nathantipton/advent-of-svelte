<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import PresentCard from "./PresentCard.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  /**
   * I tried maps and they didn't work well with the reactivity, so I'm using arrays instead
   */
  interface Props {
    data: {
      presents: Present[];
    };
  }

  const { data } = $props<Props>();
  let myPresentId = $state<number | null>(null);
  let presentsInSleigh = $state<Present[]>([]);
  let presentsOnShelf = $state<Present[]>(data.presents);
  let message = $state<string>("");
  let messageType = $state<"success" | "error" | "">("");

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
      addMessage("That's too heavy!", "error");
      return;
    }
    if (target === "shelf" && present.id === myPresentId) {
      addMessage("Nope! My present stays on the sleigh", "error");
      return;
    }
    handlePresentDrop(present, target);
  }

  function handlePresentDrop(present: Present, target: "sleigh" | "shelf") {
    if (target === "sleigh") {
      if (presentsInSleigh.filter((p) => p.name === present.name).length > 0) {
        return;
      }
      presentsInSleigh = [...presentsInSleigh, present];
      presentsOnShelf = presentsOnShelf.filter((p) => p.id !== present.id);
    } else if (target === "shelf") {
      presentsOnShelf = [...presentsOnShelf, present].sort(
        (a, b) => a.id - b.id
      );
      presentsInSleigh = presentsInSleigh.filter((p) => p.id !== present.id);
    } else {
      console.error("Invalid target");
    }
  }

  onMount(async () => {
    nathansPresentGoesInTheSleigh();
  });
  const nathansPresentGoesInTheSleigh = () => {
    const nathansPresent = Array.from(presentsOnShelf.values()).find(
      (present) => present.name === "Nathan"
    );
    if (!nathansPresent) return;
    myPresentId = nathansPresent.id;
    addMessage("Nathan's present goes in the sleigh", "success");
    handlePresentDrop(nathansPresent, "sleigh");
  };

  const addMessage = (content: string, type: "success" | "error" | "") => {
    messageType = type;
    message = content;

    setTimeout(() => {
      messageType = "";
      message = "";
    }, 3000);
  };
</script>

{#if message}
  <div
    class="absolute top-8 w-fit right-8 alert text-sm alert-{messageType}"
    in:fade
  >
    {message}
  </div>
{/if}
<div class="flex flex-col gap-8">
  <h2 class="text-2xl">Day 3 - Jingle Bell Balancer</h2>
  <div class="bg-base-200 rounded-xl flex flex-col p-8 gap-8">
    <div class="flex flex-col gap-4 text-center pt-12">
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
      class="relative drop-area flex flex-col justify-center items-center h-full bg-base-300 p-8 min-h-[240px] rounded border-dashed border-4 border-base-content"
    >
      <div class="uppercase text-sm font-bold absolute top-4 opacity-50">
        Drop the presents here
      </div>

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
