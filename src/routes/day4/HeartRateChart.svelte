<script lang="ts">
  import "highcharts/css/highcharts.css";
  import { onMount } from "svelte";

  import Highcharts from "highcharts";
  export let heartRates: number[];
  let chart: Highcharts.Chart;

  onMount(() => {
    chart = Highcharts.chart("heart-rate-container", {
      chart: {
        type: "spline",
        styledMode: true,
      },
      title: {
        text: "",
      },
      yAxis: {
        title: {
          text: "Beats per Minute",
        },
      },
      xAxis: {
        title: {
          text: "",
        },
        labels: {
          enabled: false,
        },
        tickLength: 0,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
      },
      series: [
        {
          type: "spline",
          name: "Heart Rate",
          data: Array.from({ length: 20 }, () => 0),
        },
      ],
    });
  });
  $: if (chart && heartRates && heartRates.length > 0) {
    const newPoint = heartRates.pop() as number;
    const shouldShift = chart.series[0].data.length > 20;
    chart.series[0].addPoint(newPoint, true, shouldShift);
  }
</script>

<div id="heart-rate-container"></div>

<style lang="postcss">
  :root {
    --highcharts-color-0: #b91c1c;
  }

  :global(#heart-rate-container .highcharts-background) {
    @apply !fill-base-200;
  }
</style>
