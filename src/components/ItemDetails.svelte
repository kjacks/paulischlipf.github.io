<script>
  let { item, classlist } = $props();
</script>

<div class={`p-6 ${classlist}`}>
  <h2 class="text-xl font-semibold">
    {item.data.title}
  </h2>
  <p class="text-sm text-gray-500 mt-1">
    {item.data.date.toLocaleDateString("de-DE", {
      year: "numeric",
    })}
  </p>
  {#if item.data.dimensions}
    <p class="mt-4 text-gray-700">{item.data.dimensions}</p>
  {/if}
  {#if item.data.medium}
    <p class="mt-4 text-gray-700">{item.data.medium}</p>
  {/if}
  {#if item.data.description}
    <p class="mt-4 text-gray-700 max-w-2xl">{item.data.description}</p>
  {/if}
</div>
