import Polyglot from "node-polyglot";

// Locale to show when page first loads
const defaultLocale = "en";

const polyglot = new Polyglot();

// Load translation messages from the network
async function loadTranslations(locale) {
  return await fetch(`/lang/${locale}.json`).then(
    (response) => response.json(),
  );
}

// Translate all elements on the page that have a
// data-i18n-key attribute
function translatePage() {
  const translatableElements = document.querySelectorAll(
    "[data-i18n-key]",
  );

  translatableElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-key");

    el.innerHTML = polyglot.t(key);
  });
}

// Load translations for the given locale and translate
// page elements for this locale
async function loadAndTranslate(locale) {
  const translations = await loadTranslations(locale);

  polyglot.replace(translations);

  document.documentElement.lang = locale;
  document.documentElement.dir =
    locale === "ar" ? "rtl" : "ltr";

  translatePage();
}

// Whenever the user switches the active locale, load
// this locale's messages into the page
function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector(
    "[data-i18n-switcher]",
  );

  switcher.value = initialValue;

  switcher.onchange = (e) => {
    loadAndTranslate(e.target.value);
  };
}

// Init
loadAndTranslate(defaultLocale);
bindLocaleSwitcher(defaultLocale);
