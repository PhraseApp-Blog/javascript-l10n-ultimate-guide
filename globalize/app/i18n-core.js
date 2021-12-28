async function initI18n(opt) {
  Globalize.load(
    await loadMainLocaleData(opt.supportedLocales)
  );
  Globalize.load(
    await loadSupplementals(opt.requiredSupplementals)
  );

  loadLocaleAndTranslatePage(opt.defaultLocale);
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
      element.innerHTML = Globalize.formatMessage(key);
    });
}

function setDocumentAttrs(locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = dir(locale);
}

function dir(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}
