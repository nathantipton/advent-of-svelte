<script>
  import "../app.pcss";
</script>

<div
  class="container mx-auto px-4 text-center md:px-0 md:text-left flex flex-col min-screen-safe"
>
  <div
    class="grid grid-cols-1 md:grid-cols-2 items-center gap-4 py-6 h-24 z-20"
  >
    <a href="/"><h1 class="font-bold text-3xl">Advent of Svelte</h1></a>
    <a
      class="link row-start-1 text-sm md:col-start-2 md:text-right"
      href="https://advent.sveltesociety.dev/#challenges"
      target="_blank"
      rel="noopener">Credit to Svelte Society - Advent of Svelte</a
    >
  </div>

  <slot />
</div>
