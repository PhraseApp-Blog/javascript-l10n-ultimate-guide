i18next.init({
  lng: "ar",
  debug: true,
  resources: {
    en: {
      translation: {
        "app-title": "jQuery + i18next",
      },
    },
    ar: {
      translation: {
        "app-title": "جي كويري + آي إيتين نيكست",
      },
    },
  },
});

jqueryI18next.init(i18next, $);

$("body").localize();
