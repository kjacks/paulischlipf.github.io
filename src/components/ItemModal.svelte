<script>
  import { fade, fly } from "svelte/transition";
  import { date } from "astro:schema";

  let { item, onclose } = $props();

  function onKeydown(e) {
    if (e.key === "Escape") onclose();
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div
  class="fixed inset-0 z-50 flex items-center justify-center p-4"
  role="dialog"
  aria-modal="true"
  aria-label={item.data.title}
  transition:fade={{ duration: 200 }}
>
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->

  <div
    class="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded shadow-xl flex flex-row p-4"
    // onclick={(e) => e.stopPropagation()}
    transition:fly={{ y: 32, duration: 250 }}
  >
    <button
      type="button"
      class="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-black text-xl leading-none"
      onclick={onclose}
      aria-label="Close">&times;</button
    >

    {#if item.data.image}
      <img
        src={item.data.image}
        alt={item.data.title}
        class="w-full object-contain max-h-[60vh]"
      />
    {/if}

    <div class="p-6">
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
        <p class="mt-4 text-gray-700">{item.data.description}</p>
      {/if}
    </div>
  </div>
</div>
