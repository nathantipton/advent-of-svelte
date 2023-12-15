<script lang="ts">
  interface Props {
    tally: number;
  }

  const { tally } = $props<Props>();

  let emoji = $state("");

  $effect(() => {
    if (tally > 0) {
      emoji = "🎁";
    } else {
      emoji = "🪨";
    }
  });
</script>

{emoji}
