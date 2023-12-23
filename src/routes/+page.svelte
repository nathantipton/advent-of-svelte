<script lang="ts">
  import dayjs, { type Dayjs } from "dayjs";

  let progress = $state(8);
  let startDate = dayjs("2023-12-01").startOf("month");
  const calendarSquares: Array<{ day: number; date: Dayjs } | null> = [
    ...(Array.from({ length: startDate.day() }).fill(null) as null[]), //calendar offset
    ...Array.from({ length: startDate.daysInMonth() }).map((_, i) => {
      return {
        day: i + 1,
        date: startDate.add(i, "day"),
      };
    }),
  ];
</script>

<svelte:head>
  <title>Home | Advent of Svelte 2023</title>
</svelte:head>

<div
  class="flex flex-col gap-8 container mx-auto max-w-4xl p-8 bg-base-100 rounded-xl"
>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 bg-morse-code bg-cover bg-no-repeat bg-center -z-10 opacity-10"
  ></div>
  <div class="flex flex-col text-center gap-2">
    <h1 class="font-xmas text-primary font-bold text-6xl">December 2023</h1>
    <h4 class="font-xmas font-bold text-2xl">Svelte Advent Calendar</h4>
  </div>
  <div class="grid grid-cols-7 gap-4">
    {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as day}
      <div
        class="bg-base-200 p-2 rounded-lg text-center text-xs uppercase font-semibold"
      >
        {day}
      </div>
    {/each}
    {#each calendarSquares as day, i}
      <svelte:element
        this={day?.day && day.day <= progress ? "a" : "div"}
        href={`/day/${day?.day}`}
        class="text-center calendar-day"
        class:font-bold={i === startDate.day() + progress - 1}
      >
        {day?.date.format("D")}
      </svelte:element>
    {/each}
  </div>
</div>

<style lang="postcss">
  .calendar-day {
    @apply rounded-xl p-2 lg:p-4 text-xl lg:text-4xl font-xmas font-bold;
  }

  a.calendar-day {
    @apply text-white cursor-pointer bg-base-200 hover:bg-base-300 transition-all;
  }
  div.calendar-day {
    @apply text-base-300;
  }
</style>
