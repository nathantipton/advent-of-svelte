<script lang="ts">
  const { number, precision } = $props<{
    number: number;
    precision?: number;
  }>();
  let abbrevitatedNumber = $state("");

  function abbreviateNumber(value: number, precision: number = 2) {
    const suffixes = ["K", "M", "B", "T"];
    let suffixNum = 0;
    let shortValue = value;

    while (shortValue >= 1000 && suffixNum < suffixes.length) {
      suffixNum++;
      shortValue /= 1000;
    }

    if (suffixNum > 0) {
      return shortValue.toFixed(precision) + suffixes[suffixNum - 1];
    } else {
      return value.toString();
    }
  }

  $effect(() => {
    abbrevitatedNumber = abbreviateNumber(number, precision);
  });
</script>

{abbrevitatedNumber}
