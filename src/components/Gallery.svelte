<script>
  import ItemModal from "./ItemModal.svelte";

  let { items } = $props();

  let selected = $state(null);

  function open(item) {
    console.log("Opening item", item);
    selected = item;
    location.hash = item.id;
  }

  function close() {
    selected = null;
    history.replaceState(null, "", location.pathname + location.search);
  }
</script>

<div
  class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-between"
>
  {#each items as item}
    <button
      type="button"
      id={item.id}
      class="group relative block overflow-hidden aspect-square cursor-pointer w-full"
      onclick={() => {
        console.log("clicking item", item);
        open(item);
      }}
    >
      {#if item.data.image}
        <img
          src={item.data.image}
          alt={item.data.title}
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      {:else}
        <div class="w-full h-full bg-gray-200"></div>
      {/if}
      <div
        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white text-left"
      >
        <p class="font-semibold text-sm leading-tight">
          {item.data.title}
        </p>
        <p class="text-xs text-gray-300 mt-1">
          {item.data.date.toLocaleDateString("de-DE", {
            year: "numeric",
          })}
        </p>
      </div>
    </button>
  {/each}
</div>

{#if selected}
  <ItemModal item={selected} onclose={close} />
{/if}
