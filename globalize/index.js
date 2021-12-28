const mainLocaleDataUrlTpl =
  "lib/cldr-json/cldr-localenames-full/main/{locale}/languages.json";
const supplementalUrlTpl =
  "/lib/cldr-json/cldr-core/supplemental/{feature}.json";
const messageUrlTpl = "/lang/{locale}.json";

const defaultLocale = "en";
const supportedLocales = ["en", "ar"];
const requiredSupplementals = ["likelySubtags"];

(async function () {
  Globalize.load(
    await loadMainLocaleData(supportedLocales)
  );
  Globalize.load(
    await loadSupplementals(requiredSupplementals)
  );
  Globalize.loadMessages(
    await loadMessagesFor(messageUrlTpl, defaultLocale)
  );

  const globalize = Globalize(defaultLocale);

  document
    .querySelectorAll("[data-i18n-key]")
    .forEach((element) => {
      const key = element.getAttribute("data-i18n-key");
      element.innerHTML = globalize.formatMessage(key);
    });
})();
