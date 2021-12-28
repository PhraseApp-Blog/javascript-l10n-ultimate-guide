const defaultLocale = "ar";
const supportedLocales = ["en", "ar"];
const requiredSupplementals = [
  "likelySubtags",
  "plurals",
  "ordinals",
];

(async function () {
  await initI18n({
    supportedLocales,
    requiredSupplementals,
    defaultLocale,
  });

  initLocaleSwitcher(defaultLocale);
})();
