import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import de from "./locales/de.json";

const language = localStorage.getItem("language") || "de";
i18next
  .use(initReactI18next)
  .use(LanguageDector)
  .init({
    fallbackLng: language,
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: language, 
    interpolation: {
      escapeValue: false, 
    },
  });

// Function to change language (this will be used throughout the app)
function changeLanguage(lng) {
  i18next.changeLanguage(lng);
}

export { changeLanguage };
