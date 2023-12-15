<script lang="ts">
  const { present } = $props<{ present: Present }>();
  const { name, weight } = present;

  function onDragStart(event: DragEvent, present: Present) {
    event.dataTransfer?.setData("text", JSON.stringify(present));
  }
</script>

<div
  on:dragstart={(event) => {
    onDragStart(event, present);
  }}
  role="option"
  tabindex="0"
  aria-selected="true"
  draggable="true"
  class="h-16 p-4 flex flex-row items-center justify-center border border-base-300 bg-base-200 shadow-lg rounded-xl gap-4"
>
  <h3 class="font-bold uppercase">🎁 {name}</h3>
  <div>{weight} kg</div>
</div>
