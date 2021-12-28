const mainLocaleDataUrlTpl =
  "lib/cldr-json/cldr-localenames-full/main/{locale}/languages.json";
const supplementalUrlTpl =
  "/lib/cldr-json/cldr-core/supplemental/{feature}.json";
const messageUrlTpl = "/lang/{locale}.json";

const defaultLocale = "en";
const supportedLocales = ["en", "ar"];
const requiredSupplementals = ["likelySubtags"];

(async function () {
  await initI18n({
    supportedLocales,
    requiredSupplementals,
    defaultLocale,
  });

  initLocaleSwitcher(defaultLocale);
})();
