export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

export const dateLocales: Record<Lang, string> = {
  en: 'en-AU',
  de: 'de-DE',
};

const ui = {
  en: {
    'nav.home': 'Home',
    'nav.works': 'Works',
    'nav.installations': 'Installations',
    'nav.bio': 'Bio',
    'nav.contact': 'Contact',
    'works.title': 'Works',
    'works.back': '← Works',
    'installations.title': 'Installations',
    'installations.back': '← Installations',
    'label.medium': 'Medium',
    'label.location': 'Location',
    'label.date': 'Date',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.works': 'Werke',
    'nav.installations': 'Installationen',
    'nav.bio': 'Biografie',
    'nav.contact': 'Kontakt',
    'works.title': 'Werke',
    'works.back': '← Werke',
    'installations.title': 'Installationen',
    'installations.back': '← Installationen',
    'label.medium': 'Medium',
    'label.location': 'Ort',
    'label.date': 'Datum',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui.en): string {
    return ui[lang][key];
  };
}

/** Returns the path prefix for a locale. EN has no prefix (default). */
export function localePath(lang: Lang): string {
  return lang === 'de' ? '/de' : '';
}

/** Returns the alternate locale for a given locale. */
export function alternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'de' : 'en';
}
