async function initI18n() {
  await i18next.use(i18nextHttpBackend).init({ lng: "en" });

  jqueryI18next.init(i18next, $);
}

function translatePage() {
  $(document.documentElement)
    .attr("lang", i18next.language)
    .attr("dir", i18next.dir(i18next.language));

  $("body").localize();
}

(async function () {
  await initI18n();
  translatePage();
})();
