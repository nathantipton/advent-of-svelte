<script lang="ts">
  const { value } = $props<{ value: number }>();

  let transformedValue = $state("");

  $effect(() => {
    transformedValue = value.toFixed(0).padStart(2, "0");
  });
</script>

{transformedValue}
