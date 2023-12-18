<script lang="ts">
  import { onMount } from "svelte";
  import { derived, writable, type Writable } from "svelte/store";
  import HeartRateChart from "./HeartRateChart.svelte";

  const heartRates = writable<number[]>([]);
  let currentHeartRate: number | null = null;
  let zone: "resting" | "fat-burning" | "cardio" | "peak" = "resting";

  $: if (currentHeartRate) {
    if (currentHeartRate < 60) {
      zone = "resting";
    } else if (currentHeartRate < 100) {
      zone = "fat-burning";
    } else if (currentHeartRate < 140) {
      zone = "cardio";
    } else {
      zone = "peak";
    }
  }

  const HEARTRATE_URL =
    "https://advent.sveltesociety.dev/data/2023/day-four.json";

  onMount(() => {
    const interval = setInterval(async () => {
      const heartRate = await getSantasHeartRate();
      currentHeartRate = heartRate.heartRate;
      heartRates.update((rates) => [
        // last 20 heart rates
        ...rates.splice(-19),
        heartRate.heartRate,
      ]);
    }, 1000);
    return () => clearInterval(interval);
  });

  const getSantasHeartRate = async (): Promise<HeartRate> => {
    return fetch(HEARTRATE_URL).then((res) => res.json());
  };
</script>

<svelte:head>
  <title>Day 4 | Advent of Svelte 2023</title>
</svelte:head>

<div class="flex flex-col gap-8">
  <h2 class="text-2xl">Day 4 - Heart of Christmas</h2>

  <div class="bg-base-200 rounded-xl min-h-[360px]">
    <div class="grid md:grid-cols-3 items-center px-8 py-4 gap-8">
      <div
        class="flex flex-row items-center justify-center md:justify-start gap-2"
      >
        <div class="text-6xl">🎅</div>
        <div>
          <h3 class="font-bold text-4xl md:text-2xl">Heart Rate</h3>
          <p class="text-xs md:text-small">Tracking Santa's heart rate</p>
        </div>
      </div>
      <div
        class="bg-base-300 flex-1 p-4 rounded flex flex-col gap-2 items-center justify-center"
      >
        <div class="text-xs font-semibold uppercase">Heart Rate Zone</div>
        <div class="text-2xl font-bold uppercase">{zone}</div>
      </div>
      <div class="flex flex-row gap-4">
        <div
          class="bg-base-300 p-4 rounded flex-1 flex flex-col gap-2 items-center justify-center"
        >
          <div class="text-xs font-semibold uppercase">Current HR</div>
          <div class="text-2xl font-bold">
            {currentHeartRate?.toFixed(0) ?? "-"}
          </div>
        </div>
      </div>
    </div>
    <HeartRateChart heartRates={$heartRates} />
  </div>
</div>
