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
