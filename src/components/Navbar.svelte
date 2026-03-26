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

  let { lang, altHref } = $props();

  const t = $derived(useTranslations(lang));
  const prefix = $derived(localePath(lang));
  const altLang = $derived(alternateLang(lang));
</script>

<Navbar>
  <NavBrand href="/">
    <span
      class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
      >Pauli Schlipf</span
    >
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href={`${prefix}/paintings`}>{t("nav.paintings")}</NavLi>
    <NavLi href={`${prefix}/objects`}>{t("nav.objects")}</NavLi>
    <NavLi href={`${prefix}/installations`}>{t("nav.installations")}</NavLi>
    <NavLi href={`${prefix}/bio`}>{t("nav.bio")}</NavLi>
    <NavLi href={`${prefix}/contact`}>{t("nav.contact")}</NavLi>
    <NavLi href={altHref} lang={altLang}>{languages[altLang]}</NavLi>
  </NavUl>
</Navbar>
