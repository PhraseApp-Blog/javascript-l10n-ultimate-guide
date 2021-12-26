async function initI18n() {
  await i18next.use(i18nextHttpBackend).init({
    lng: "en"
  });

  jqueryI18next.init(i18next, $);
}

function translatePageElements() {
  $('body').localize();
}

(async function () {
  await initI18n();
  translatePageElements();
}());
