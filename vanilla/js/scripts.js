// The locale our app first shows
const defaultLocale = "en";

// The active locale
let locale;

// Gets filled with active locale translations
let translations = {};

// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
  // Translate the page to the default locale
  setLocale(defaultLocale);

  bindLocaleSwitcher(defaultLocale);
});

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
  if (newLocale === locale) return;

  const newTranslations = await fetchTranslationsFor(
    newLocale,
  );

  locale = newLocale;
  translations = newTranslations;
  document.documentElement.lang = newLocale;

  translatePage();
}

// Retrieves translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`/lang/${newLocale}.json`);
  return await response.json();
}

// Replace the inner text of all elements with the
// data-i18n-key attribute to translations corresponding
// to their data-i18n-key
function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translate);
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translate(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[key];
  element.innerText = translation;
}

function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector(
    "[data-i18n-switcher]",
  );

  switcher.value = initialValue;

  switcher.onchange = (e) => {
    setLocale(e.target.value);
  };
}
