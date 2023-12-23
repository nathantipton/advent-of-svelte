<script lang="ts">
  interface Props {
    seconds: number;
  }

  const { seconds } = $props<Props>();
  let time = $state(seconds);

  $effect(() => {
    time = seconds;
  });

  const convertSecondsToTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, "0")}`;
  };
</script>

<p class="font-bold tracking-wider">
  <i class="fa-solid opacity-40 mr-2 fa-stopwatch"></i>{convertSecondsToTime(
    time
  )}
</p>
