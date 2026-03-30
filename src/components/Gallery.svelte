<script>
  import { dateLocales, localePath } from "../i18n/translations";
  import ItemModal from "./ItemModal.svelte";

  let { items, lang } = $props();

  const prefix = localePath(lang);

  let selected = $state(null);

  function open(item) {
    selected = item;
    location.hash = item.id;
  }

  function close() {
    selected = null;
    history.replaceState(null, "", location.pathname + location.search);
  }
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-between">
  {#each items as item}
    <button
      type="button"
      id={item.id}
      class="group relative block overflow-hidden aspect-square cursor-pointer w-full"
      onclick={() => open(item)}
    >
      {#if item.data.image}
        <img
          src={item.data.image}
          alt={lang === "de" ? item.data.title_de : item.data.title_en}
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      {:else}
        <div class="w-full h-full bg-gray-200"></div>
      {/if}
      <div
        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white"
      >
        <p class="font-semibold text-sm leading-tight">
          {lang === "de" ? item.data.title_de : item.data.title_en}
        </p>
        <p class="text-xs text-gray-300 mt-1">
          {item.data.date.toLocaleDateString(dateLocales[lang], {
            year: "numeric",
          })}
        </p>
      </div>
    </button>
  {/each}
</div>

{#if selected}
  <ItemModal item={selected} {lang} onclose={close} />
{/if}
