<script>
  import { dateLocales } from "../i18n/translations";

  let { item, lang, onclose } = $props();

  function onKeydown(e) {
    if (e.key === "Escape") onclose();
  }
</script>

<svelte:window on:keydown={onKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
  onclick={onclose}
>
  <div
    class="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded shadow-xl"
    onclick={(e) => e.stopPropagation()}
  >
    <button
      type="button"
      class="absolute top-3 right-3 text-gray-500 hover:text-black text-xl leading-none"
      onclick={onclose}
      aria-label="Close"
    >&times;</button>

    {#if item.data.image}
      <img
        src={item.data.image}
        alt={lang === "de" ? item.data.title_de : item.data.title_en}
        class="w-full object-contain max-h-[60vh]"
      />
    {/if}

    <div class="p-6">
      <h2 class="text-xl font-semibold">
        {lang === "de" ? item.data.title_de : item.data.title_en}
      </h2>
      <p class="text-sm text-gray-500 mt-1">
        {item.data.date.toLocaleDateString(dateLocales[lang], {
          year: "numeric",
          month: "long",
        })}
      </p>
      {#if lang === "de" && item.data.description_de}
        <p class="mt-4 text-gray-700">{item.data.description_de}</p>
      {:else if item.data.description_en}
        <p class="mt-4 text-gray-700">{item.data.description_en}</p>
      {/if}
    </div>
  </div>
</div>
