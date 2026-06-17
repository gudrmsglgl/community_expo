import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getLocales } from "expo-localization";
import en from "./locales/en";
import ko from "./locales/ko";

export const fallbackLanguage = "ko";
export const supportedLanguage = ["ko", "en"] as const;

export type SupportedLanguage = (typeof supportedLanguage)[number];
export const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

function isSupportedLanguage(
  language: string | null,
): language is SupportedLanguage {
  return supportedLanguage.includes(language as SupportedLanguage);
}

export function getInitialLanguage(): SupportedLanguage {
  const deviceLanguage = getLocales()[0]?.languageCode ?? fallbackLanguage;

  if (isSupportedLanguage(deviceLanguage)) {
    return deviceLanguage;
  }

  return fallbackLanguage;
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: fallbackLanguage,
    supportedLngs: supportedLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
