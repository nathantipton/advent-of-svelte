<script lang="ts">
  import dayjs from "dayjs";
  const { date, format } = $props<{ date: Date | string; format?: string }>();

  let formattedDate = $state("");

  const dateFormats: { [key: string]: string } = {
    short: "M/d/YY, h:mm a", // e.g., 6/15/15, 9:03 AM
    medium: "MMM d, YYYY, h:mm:ss a", // e.g., Jun 15, 2015, 9:03:01 AM
    long: "MMMM d, YYYY, h:mm:ss a z", // e.g., June 15, 2015 at 9:03:01 AM GMT+1
    full: "EEEE, MMMM d, Y, h:mm:ss a zzzz", // e.g., Monday, June 15, 2015 at 9:03:01 AM Greenwich Mean Time
    shortDate: "M/d/YY", // e.g., 6/15/15
    mediumDate: "MMM d, YYYY", // e.g., Jun 15, 2015
    longDate: "MMMM d, YYYY", // e.g., June 15, 2015
    fullDate: "EEEE, MMMM d, YYYY", // e.g., Monday, June 15, 2015
    shortTime: "h:mm a", // e.g., 9:03 AM
    mediumTime: "h:mm:ss a", // e.g., 9:03:01 AM
    longTime: "h:mm:ss a z", // e.g., 9:03:01 AM GMT+1
    fullTime: "h:mm:ss a zzzz", // e.g., 9:03:01 AM Greenwich Mean Time
  };
  $effect(() => {
    formattedDate = dayjs(date).format(
      dateFormats[format ?? "short"] || format
    );
  });
</script>

{formattedDate}
