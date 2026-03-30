<script>
  import ItemModal from "./ItemModal.svelte";

  let { items } = $props();

  let selected = $state(null);
  let loaded = $state(items.map(() => false));

  function open(item) {
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
  {#each items as item, i}
    <button
      type="button"
      id={item.id}
      class="group relative block overflow-hidden aspect-square cursor-pointer w-full"
      onclick={() => {
        open(item);
      }}
    >
      {#if item.data.image}
        <img
          src={item.data.image.src}
          width={item.data.image.width}
          height={item.data.image.height}
          alt={item.data.title}
          loading="lazy"
          decoding="async"
          style="opacity: {loaded[i]
            ? 1
            : 0}; transition: opacity 500ms ease {i * 80}ms;"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onload={() => (loaded[i] = true)}
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
        {#if item.data.dimensions}
          <p class="text-xs text-gray-300 mt-1">{item.data.dimensions}</p>
        {/if}

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
