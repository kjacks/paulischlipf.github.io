<script>
  import ItemModal from "./ItemModal.svelte";

  let { items } = $props();

  let selected = $state(null);
  let activeIndex = $state(0);

  const ITEM_SIZE = 180;
  const count = items.length;
  const angleStep = 360 / count;
  // Radius of the circle — larger with more items so they don't overlap
  const radius = Math.max(250, (ITEM_SIZE * count) / (2 * Math.PI) + 40);

  function rotateTo(index) {
    activeIndex = index;
  }

  function open(item, index) {
    rotateTo(index);
    selected = item;
    location.hash = item.id;
  }

  function close() {
    selected = null;
    history.replaceState(null, "", location.pathname + location.search);
  }

  function onKeydown(e) {
    if (e.key === "ArrowLeft") activeIndex = (activeIndex - 1 + count) % count;
    if (e.key === "ArrowRight") activeIndex = (activeIndex + 1) % count;
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div class="w-full flex flex-col items-center gap-8 py-12">
  <!-- 3D scene -->
  <div
    class="relative"
    style="
      width: 100%;
      height: {radius * 2 + ITEM_SIZE}px;
      perspective: 1200px;
    "
  >
    <div
      class="absolute inset-0 flex items-center justify-center"
      style="transform-style: preserve-3d;"
    >
      <div
        class="relative"
        style="
          width: {ITEM_SIZE}px;
          height: {ITEM_SIZE}px;
          transform-style: preserve-3d;
          transform: rotateY({-activeIndex * angleStep}deg);
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        "
      >
        {#each items as item, i}
          {@const angle = i * angleStep}
          {@const isFront = i === activeIndex}
          <button
            type="button"
            class="absolute inset-0 cursor-pointer bg-transparent border-none p-0"
            style="
              width: {ITEM_SIZE}px;
              height: {ITEM_SIZE}px;
              transform: rotateY({angle}deg) translateZ({radius}px);
              opacity: {isFront ? 1 : 0.65};
              transition: opacity 0.6s ease;
            "
            onclick={() => open(item, i)}
          >
            {#if item.data.image}
              <img
                src={item.data.image}
                alt={item.data.title}
                class="w-full h-full object-contain block"
              />
            {:else}
              <div class="w-full h-full bg-gray-200 rounded"></div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Title of the front item -->
  <p class="text-lg text-gray-800 font-semibold text-center min-h-[1.8em] transition-opacity duration-300">
    {items[activeIndex]?.data.title ?? ""}
  </p>

  <!-- Prev / Next arrows -->
  <div class="flex gap-6">
    <button
      type="button"
      class="text-2xl text-gray-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
      aria-label="Previous"
      onclick={() => (activeIndex = (activeIndex - 1 + count) % count)}
    >&larr;</button>
    <button
      type="button"
      class="text-2xl text-gray-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
      aria-label="Next"
      onclick={() => (activeIndex = (activeIndex + 1) % count)}
    >&rarr;</button>
  </div>
</div>

{#if selected}
  <ItemModal item={selected} onclose={close} />
{/if}
