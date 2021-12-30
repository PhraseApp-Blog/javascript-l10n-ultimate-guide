const messageUrlTpl = "/lang/{locale}.json";

async function initI18n(
  requiredSupplementals,
  defaultLocale
) {
  Globalize.load(await loadMainLocaleData(defaultLocale));
  Globalize.load(
    await loadSupplementals(requiredSupplementals)
  );

  loadLocaleAndTranslatePage(defaultLocale);
}

async function loadLocaleAndTranslatePage(locale) {
  Globalize.loadMessages(
    await loadMessagesFor(messageUrlTpl, locale)
  );
  Globalize.locale(locale);
  setDocumentAttrs(locale);
  translatePageElements();
}

function translatePageElements() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach((element) => {
      const key = element.getAttribute("data-i18n-key");

      const interpolations =
        element.getAttribute("data-i18n-opt");
      const parsedInterpolations = interpolations
        ? JSON.parse(interpolations)
        : {};

      element.innerHTML = Globalize.formatMessage(
        key,
        parsedInterpolations
      );
    });
}

function setDocumentAttrs(locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = dir(locale);
}

function dir(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}
