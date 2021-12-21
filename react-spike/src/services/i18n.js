import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "app-title": "With React",
      },
    },
    ar: {
      translation: {
        "app-title": "مع ريأكت",
      },
    },
  },
  lng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});
export default i18next;
