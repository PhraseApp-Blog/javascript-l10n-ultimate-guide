const defaultLocale = "en";

async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
}

async function setLocale(locale) {
  const messages = await fetchJson(`/lang/${locale}.json`);
  Globalize.loadMessages(messages);
  Globalize.locale(locale);
  setDocumentAttrs(locale);
  translatePageElements();
}

function setDocumentAttrs(locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir =
    locale === "ar" ? "rtl" : "ltr";
}

function translatePageElements() {
  const elements = document.querySelectorAll(
    "[data-i18n-key]"
  );

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n-key");

    try {
      element.innerHTML = Globalize.formatMessage(key);
    } catch (error) {
      if (error.code === "E_MISSING_MESSAGE") {
        console.warn(error.message);
      } else {
        console.error(error);
      }
    }
  });
}

function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector(
    "[data-i18n-switcher]"
  );

  switcher.value = initialValue;

  switcher.onchange = (e) => {
    setLocale(e.target.value);
  };
}

(async function () {
  const likelySubtags = await fetchJson(
    "/lib/cldr-json/cldr-core/supplemental/likelySubtags.json"
  );
  Globalize.load(likelySubtags);

  await setLocale(defaultLocale);

  bindLocaleSwitcher(defaultLocale);
})();
