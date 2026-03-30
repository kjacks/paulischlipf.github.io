<script>
  let { items } = $props();
</script>

{#each items as item, i}
  {@const reversed = i % 2 !== 0}
  <section class="my-32 px-4 md:px-8 lg:px-16">
    <div
      class="flex flex-col md:flex-row gap-8 items-start"
      class:md:flex-row-reverse={reversed}
    >
      <!-- Text -->
      <div class="w-full md:w-2/5 flex flex-col justify-center">
        <h2 class="text-2xl font-bold mb-2">{item.data.title}</h2>
        <p class="text-sm text-gray-500">
          {item.data.date.toLocaleDateString("de-DE", { year: "numeric" })}
        </p>
        {#if item.data.location}
          <p class="mt-3 text-gray-600">{item.data.location}</p>
        {/if}
        {#if item.data.description}
          <p class="mt-3 text-gray-700 leading-relaxed">
            {item.data.description}
          </p>
        {/if}
      </div>

      <!-- Masonry grid -->
      {#if item.data.images?.length}
        <div class="w-full md:w-3/5 columns-2 sm:columns-3 gap-3 max-h-[500px] overflow-hidden">
          {#each item.data.images as img}
            <img
              src={img.src}
              width={img.width}
              height={img.height}
              alt={item.data.title}
              loading="lazy"
              decoding="async"
              class="w-full mb-3 max-h-[220px] rounded object-cover break-inside-avoid"
            />
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/each}
