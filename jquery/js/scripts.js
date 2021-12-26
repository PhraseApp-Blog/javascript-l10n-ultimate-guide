async function initI18n() {
  await i18next.use(i18nextHttpBackend).init({ lng: "en" });

  jqueryI18next.init(i18next, $, { useOptionsAttr: true });
}

function translatePage() {
  $(document.documentElement)
    .attr("lang", i18next.language)
    .attr("dir", i18next.dir(i18next.language));

  $("body").localize();
}

function bindLocaleSwitcher() {
  const $switcher = $("[data-i18n-switcher]");

  $switcher.val(i18next.language);

  $switcher.on("change", async function () {
    await i18next.changeLanguage($switcher.val());
    translatePage();
  });
}

(async function () {
  await initI18n();
  translatePage();
  bindLocaleSwitcher();
})();
