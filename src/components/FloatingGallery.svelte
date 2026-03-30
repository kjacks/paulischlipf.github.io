<script>
  import ItemModal from "./ItemModal.svelte";

  let { items } = $props();

  let selected = $state(null);
  let containerWidth = $state(0);

  function open(item) {
    selected = item;
    location.hash = item.id;
  }

  function close() {
    selected = null;
    history.replaceState(null, "", location.pathname + location.search);
  }

  // Seeded PRNG (mulberry32)
  function seededRandom(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const MIN_SIZE = 120;
  const MAX_SIZE = 200;
  const PAD = 20;

  const layout = $derived.by(() => {
    const w = containerWidth || 800;
    const n = items.length;
    const rand = seededRandom(42);

    // Choose cols to roughly match a 16:9 canvas for n items
    const cols = Math.max(2, Math.round(Math.sqrt(n * (16 / 9))));
    const rows = Math.ceil(n / cols);

    // Square cells that fill the full width
    const cellW = Math.floor(w / cols);
    const cellH = cellW;
    const canvasH = rows * cellH;

    // Fisher-Yates shuffle of cell indices so items aren't placed in row order
    const cellIdx = Array.from({ length: cols * rows }, (_, i) => i);
    for (let i = cellIdx.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [cellIdx[i], cellIdx[j]] = [cellIdx[j], cellIdx[i]];
    }

    const positions = items.map((_, i) => {
      const size = MIN_SIZE + rand() * (MAX_SIZE - MIN_SIZE);
      const cell = cellIdx[i];
      const col = cell % cols;
      const row = Math.floor(cell / cols);

      // Random offset within the cell, keeping the item fully inside
      const maxOffX = Math.max(0, cellW - size - PAD * 2);
      const maxOffY = Math.max(0, cellH - size - PAD * 2);
      const x = col * cellW + PAD + rand() * maxOffX;
      const y = row * cellH + PAD + rand() * maxOffY;

      return { x, y, size };
    });

    return { canvasH, positions };
  });
</script>

<div
  class="relative w-full"
  bind:clientWidth={containerWidth}
  style="height: {layout.canvasH}px"
>
  {#each items as item, i}
    {@const { x, y, size } = layout.positions[i]}
    <button
      type="button"
      id={item.id}
      class="absolute group cursor-pointer bg-transparent border-none p-0"
      style="
        left: {x}px;
        top: {y}px;
        width: {size}px;
        height: {size}px;
        transition: transform 0.2s ease;
      "
      onmouseenter={(e) => (e.currentTarget.style.transform = `scale(1.06)`)}
      onmouseleave={(e) => (e.currentTarget.style.transform = `scale(1)`)}
      onclick={() => open(item)}
    >
      {#if item.data.image}
        <!-- object-contain keeps the full image visible within the slot;
             no background so only the image shape is seen -->
        <img
          src={item.data.image.src}
          width={item.data.image.width}
          height={item.data.image.height}
          alt={item.data.title}
          loading="lazy"
          decoding="async"
          class="w-full h-full object-contain block"
        />
      {:else}
        <div class="w-8 h-8 rounded-full bg-gray-300"></div>
      {/if}

      <p
        class="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 leading-tight"
      >
        {item.data.title}
      </p>
    </button>
  {/each}
</div>

{#if selected}
  <ItemModal item={selected} onclose={close} />
{/if}
