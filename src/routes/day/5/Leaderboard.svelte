<script lang="ts">
  import type { Leaderboard } from "$lib/models";

  interface Props {
    leaderboard: Leaderboard;
    title: string;
    columnName: string;
  }

  const { leaderboard, title, columnName } = $props<Props>();
</script>

<div>
  <h4 class="text-center font-semibold">{title}</h4>
  <div class="overflow-x-auto">
    <table class="table w-full table-zebra">
      <thead>
        <tr>
          <th>Elf</th>
          <th class="text-right">{columnName}</th>
        </tr>
      </thead>
      <tbody>
        {#each leaderboard as { elf, value }}
          <tr>
            <td>{elf}</td>
            <td class="text-right">{value}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
