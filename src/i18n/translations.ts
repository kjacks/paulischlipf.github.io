export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

const ui = {
  en: {
    'nav.home': 'Home',
    'nav.works': 'Works',
    'nav.installations': 'Installations',
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
