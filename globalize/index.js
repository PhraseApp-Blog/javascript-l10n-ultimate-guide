const defaultLocale = "en";
const supportedLocales = ["en", "ar"];
const requiredSupplementals = [
  "likelySubtags",
  "plurals",
  "ordinals",
];

(async function () {
  await initI18n(requiredSupplementals, defaultLocale);

  initLocaleSwitcher(defaultLocale);
})();
