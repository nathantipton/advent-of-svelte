<script lang="ts">
  import Leaderboard from "./Leaderboard.svelte";

  import { invalidateAll } from "$app/navigation";
  import Date from "$lib/components/utils/Date.svelte";
  import ShortNumber from "$lib/components/utils/ShortNumber.svelte";
  import type { DashboardModel } from "$lib/models";
  import { onMount } from "svelte";

  interface Props {
    data: DashboardModel;
  }

  const { data } = $props<Props>();
    
  onMount(() => {
    const interval = setInterval(() => {
      invalidateAll();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<svelte:head>
  <title>Day 5 | Advent of Svelte 2023</title>
</svelte:head>

<main class="p-8 bg-base-200 bg-opacity-50 rounded-xl">
  <div class="flex flex-row items-center justify-between flex-wrap">
    <div
      class="flex flex-col justify-center items-center flex-1 lg:items-start"
    >
      <h1 class="text-4xl font-bold text-primary whitespace-nowrap">
        Elf Productivity Dashboard
      </h1>
      <p class="text-sm">
        Last updated: <Date date={data.lastUpdated} format="medium" />
      </p>
    </div>
    <div class="flex flex-row flex-wrap justify-center items-baseline">
      <div class="stat w-fit">
        <div class="stat-title">Presents Wrapped</div>
        <div class="stat-value">
          <ShortNumber number={data.analytics.aggregations.totalWrappedPresents}
          ></ShortNumber>
        </div>
      </div>
      <div class="stat w-fit">
        <div class="stat-title">Toys Created</div>
        <div class="stat-value">
          <ShortNumber number={data.analytics.aggregations.totalCreatedToys}
          ></ShortNumber>
        </div>
      </div>
      <div class="stat w-fit">
        <div class="stat-title">Toys Created</div>
        <div class="stat-value">
          {data.analytics.aggregations.averageMinutesPerToy.toFixed(2)}
        </div>
        <div class="stat-desc">per minute</div>
      </div>
      <div class="stat w-fit">
        <div class="stat-title">Presents Wrapped</div>
        <div class="stat-value">
          {data.analytics.aggregations.averageMinutesPerTask.toFixed(2)}
        </div>
        <div class="stat-desc">per minute</div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
    <Leaderboard
      title="Most Wrapped Presents"
      columnName="Presents"
      leaderboard={data.analytics.mostWrappedPresentsLeaderboard}
    ></Leaderboard>

    <Leaderboard
      title="Most Created Toys"
      columnName="Toys"
      leaderboard={data.analytics.mostCreatedToysLeaderboard}
    ></Leaderboard>

    <Leaderboard
      title="Fastest Toy Makers"
      columnName="Minutes"
      leaderboard={data.analytics.fastestCreatedToyLeaderboard}
    ></Leaderboard>

    <Leaderboard
      title="Fastest Present Wrappers"
      columnName="Minutes"
      leaderboard={data.analytics.fastestWrappedPresentLeaderboard}
    ></Leaderboard>
  </div>
</main>
