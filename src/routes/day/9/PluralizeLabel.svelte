<script lang="ts">
  let { label, value } = $props<{ label: string; value: number }>();

  let pluralizedLabel = $state("");

  $effect(() => {
    pluralizedLabel = `${label}${value === 1 ? "" : "s"}`;
  });
</script>

{pluralizedLabel}
