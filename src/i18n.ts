import { useEffect } from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import de from './locales/de.json';

const useI18n = () => {
  useEffect(() => {
    const language = localStorage.getItem("language") || "de";
    i18next
      .use(initReactI18next) 
      .use(LanguageDetector) 
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
  }, []); 

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
  };

  return { changeLanguage };
};

export default useI18n;
