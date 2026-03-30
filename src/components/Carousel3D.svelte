<script>
  import ItemDetails from "./ItemDetails.svelte";

  let { items } = $props();

  let selected = $state(null);
  let containerWidth = $state(0);

  // `rotation` accumulates continuously — never wraps — so CSS always
  // takes the shortest path and never jumps.
  let rotation = $state(0);
  const count = items.length;
  const angleStep = 360 / count;
  const activeIndex = $derived(((rotation % count) + count) % count);
  const activeItem = $derived(items[activeIndex]);

  // Scale item size and radius to the container, capped for desktop
  const itemSize = $derived(
    Math.min(210, Math.floor((containerWidth || 320) * 0.28)),
  );
  const radius = $derived(
    Math.max(
      itemSize * 1.2,
      (itemSize * count) / (2 * Math.PI) + 20,
      // also keep the ring within the viewport
      Math.min(250, (containerWidth || 320) / 2 - itemSize / 2 - 16),
    ),
  );
  const sceneHeight = $derived(radius);

  function rotateTo(index) {
    const current = ((rotation % count) + count) % count;
    let delta = index - current;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    rotation += delta;
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
    if (e.key === "ArrowLeft") rotation -= 1;
    if (e.key === "ArrowRight") rotation += 1;
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div
  class="w-full flex flex-col items-center gap-6 py-8"
  bind:clientWidth={containerWidth}
>
  <!-- Prev / Next arrows -->
  <div class="flex gap-6">
    <button
      type="button"
      class="text-2xl text-gray-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
      aria-label="Previous"
      onclick={() => (rotation -= 1)}>&larr;</button
    >
    <button
      type="button"
      class="text-2xl text-gray-500 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
      aria-label="Next"
      onclick={() => (rotation += 1)}>&rarr;</button
    >
  </div>

  <!-- 3D scene -->
  <div
    class="relative w-full overflow-hidden min-h-[250px]"
    style="height: {sceneHeight}px; perspective: {radius * 5}px;"
  >
    <div
      class="absolute inset-0 flex items-center justify-center"
      style="transform-style: preserve-3d;"
    >
      <div
        class="relative"
        style="
          width: {itemSize}px;
          height: {itemSize}px;
          transform-style: preserve-3d;
          transform: rotateY({-rotation * angleStep}deg);
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
              width: {itemSize}px;
              height: {itemSize}px;
              transform: rotateY({angle}deg) translateZ({radius}px);
              opacity: {isFront ? 1 : 0.45};
              transition: opacity 0.6s ease;
              background: {isFront ? 'rgba(255, 255, 255, 1)' : 'transparent'};
            "
            onclick={() => open(item, i)}
          >
            <!-- {#if item.data.image} -->
            <img
              src={item.data.image.src}
              width={item.data.image.width}
              height={item.data.image.height}
              alt={item.data.title}
              loading="lazy"
              decoding="async"
              class="w-full h-full object-contain block"
            />
            <!-- {:else}
              <div class="w-full h-full bg-gray-200 rounded"></div>
            {/if} -->
          </button>
        {/each}
      </div>
    </div>
  </div>

  <ItemDetails item={activeItem} classlist="text-center" />
</div>
