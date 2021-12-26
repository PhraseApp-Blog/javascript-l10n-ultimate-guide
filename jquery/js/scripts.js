i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "app-title": "Hello jQuery + i18next"
      }
    },
    ar: {
      translation: {
        "app-title": "أهلاً جي كويري"
      }
    }
  }
});

jqueryI18next.init(i18next, $);

$('body').localize();