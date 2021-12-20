import i18next from "i18next";

i18next.init({
  lng: "ar",
  debug: true,
  resources: {
    en: {
      translation: {
        "app-title": "With Polyglot",
        home: "Home",
        about: "About",
      },
    },
    ar: {
      translation: {
        "app-title": "مع بوليجلوت",
        home: "الرئيسية",
        about: "نبذة عنا",
      },
    },
  },
});

const translatableElements = document.querySelectorAll(
  "[data-i18n-key]",
);
translatableElements.forEach((el) => {
  const key = el.getAttribute("data-i18n-key");
  el.innerHTML = i18next.t(key);
});
