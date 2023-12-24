<script lang="ts">
  import dayjs, { type Dayjs } from "dayjs";
  import CountdownValue from "./CountdownValue.svelte";
  import PluralizeLabel from "./PluralizeLabel.svelte";
  import { onMount } from "svelte";

  let nextChristmas = $state<Dayjs | null>(null);
  let timeUntilNextChristmas = $state(0);
  let days = $state(0);
  let hours = $state(0);
  let minutes = $state(0);
  let seconds = $state(0);
  let year = $state("");

  onMount(() => {
    let today = dayjs();

    if (today.month() === 11 && today.date() > 25) {
      nextChristmas = dayjs()
        .add(1, "year")
        .startOf("year")
        .add(11, "month")
        .add(25, "day");
    } else {
      nextChristmas = dayjs().startOf("year").add(11, "month").add(24, "day");
    }
    timeUntilNextChristmas = nextChristmas.diff(dayjs(), "second");
    year = nextChristmas.format("YYYY");
    const interval = setInterval(() => {
      timeUntilNextChristmas--;
      days = Math.floor(timeUntilNextChristmas / 86400);
      hours = Math.floor((timeUntilNextChristmas % 86400) / 3600);
      minutes = Math.floor((timeUntilNextChristmas % 3600) / 60);
      seconds = Math.floor(timeUntilNextChristmas % 60);
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div
  class="fixed top-32 md:top-24 bottom-0 bg-xmas-countdown bg-center bg-cover bg-opacity-10 left-0 right-0 -z-20"
></div>

<div
  class="absolute top-32 md:top-24 bottom-0 bg-white bg-center bg-cover bg-opacity-50 left-0 right-0 -z-10"
></div>

<div
  class="absolute top-24 bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center gap-12"
>
  <h1 class="text-6xl font-xmas text-primary font-bold">
    Santa's Countdown {year}
  </h1>
  <div class="flex flex-row gap-8">
    <div class="flex flex-col gap-2 items-center justify-center">
      <div class="value">
        <CountdownValue value={days} />
      </div>
      <div class="label">
        <PluralizeLabel label="Day" value={days}></PluralizeLabel>
      </div>
    </div>
    <div class="flex flex-col gap-2 items-center justify-center">
      <div class="value">
        <CountdownValue value={hours} />
      </div>
      <div class="label">
        <PluralizeLabel label="Hour" value={hours}></PluralizeLabel>
      </div>
    </div>
    <div class="flex flex-col gap-2 items-center justify-center">
      <div class="value">
        <CountdownValue value={minutes} />
      </div>
      <div class="label">
        <PluralizeLabel label="Minute" value={minutes}></PluralizeLabel>
      </div>
    </div>
    <div class="flex flex-col gap-2 items-center justify-center">
      <div class="value">
        <CountdownValue value={seconds} />
      </div>
      <div class="label">
        <PluralizeLabel label="Second" value={seconds}></PluralizeLabel>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .value {
    @apply text-primary font-xmas text-6xl font-bold;
  }
  .label {
    @apply text-secondary font-bold uppercase text-sm;
  }
</style>
