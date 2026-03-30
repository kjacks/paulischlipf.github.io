<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    P,
  } from "flowbite-svelte";
  import {
    useTranslations,
    localePath,
    alternateLang,
    languages,
  } from "../i18n/translations";

  let { lang, altHref, pathname = "" } = $props();

  const t = $derived(useTranslations(lang));
  const prefix = $derived(localePath(lang));
  const altLang = $derived(alternateLang(lang));

  function isActive(href) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  let activeUrl = $derived(`${prefix}/${pathname}`);
  let activeClass =
    "text-white bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-white dark:bg-green-600 md:dark:bg-transparent";
  let nonActiveClass =
    "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
  $inspect(activeUrl);
</script>

<Navbar>
  <NavBrand href="/">
    <span
      class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
      >Pauli Schlipf</span
    >
  </NavBrand>
  <NavHamburger />
  <NavUl
    {activeUrl}
    classes={{ active: activeClass, nonActive: nonActiveClass }}
  >
    <NavLi href={`${prefix}/paintings`}>{t("nav.paintings")}</NavLi>
    <NavLi href={`${prefix}/objects`}>{t("nav.objects")}</NavLi>
    <NavLi href={`${prefix}/installations`}>{t("nav.installations")}</NavLi>
    <NavLi href={`${prefix}/bio`}>{t("nav.bio")}</NavLi>
    <NavLi href={`${prefix}/contact`}>{t("nav.contact")}</NavLi>
    <NavLi href={altHref} lang={altLang}>{languages[altLang]}</NavLi>
  </NavUl>
</Navbar>

<style>
</style>
