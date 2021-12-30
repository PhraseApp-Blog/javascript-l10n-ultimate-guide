const defaultLocale = "en";
const mains = {
  localenames: ["languages"],
};
const supplementals = [
  "likelySubtags",
  "plurals",
  "ordinals",
];

async function setLocale(locale) {
  const messages = await fetchJson(`/lang/${locale}.json`);
  Globalize.loadMessages(messages);

  await loadIntoGlobalize(mainUrlsFor(mains, locale));

  Globalize.locale(locale);

  setDocumentAttrs(locale);
  translatePageElements();
  setLocaleSwitcherDisplayNames();
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

    const interpolations =
      element.getAttribute("data-i18n-opt");
    const parsedInterpolations = interpolations
      ? JSON.parse(interpolations)
      : {};

    try {
      element.innerHTML = Globalize.formatMessage(
        key,
        parsedInterpolations
      );
    } catch (error) {
      if (error.code === "E_MISSING_MESSAGE") {
        console.warn(error.message);
        element.innerHTML = key;
      } else {
        console.error(error);
      }
    }
  });
}

function bindLocaleSwitcher() {
  const switcher = document.querySelector(
    "[data-i18n-switcher]"
  );

  switcher.value = Globalize.locale().locale;

  switcher.onchange = (e) => {
    setLocale(e.target.value);
  };
}

function setLocaleSwitcherDisplayNames() {
  const options = document.querySelectorAll(
    "[data-i18n-switcher] option"
  );

  options.forEach((option) => {
    const localeCode = option.value;

    option.textContent = Globalize.cldr.main(
      `localeDisplayNames/languages/${localeCode}`
    );
  });
}

async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
}

function mainUrlsFor(options, locale) {
  const result = [];

  Object.keys(options).forEach((key) => {
    options[key].forEach((collection) => {
      result.push(
        `/lib/cldr-json/cldr-${key}-full/main/${locale}/${collection}.json`
      );
    });
  });

  return result;
}

function supplementalUrlsFor(options) {
  return options.map(
    (feature) =>
      `/lib/cldr-json/cldr-core/supplemental/${feature}.json`
  );
}

async function loadIntoGlobalize(featureUrls) {
  await Promise.all(
    featureUrls.map((url) => fetchJson(url))
  ).then((downloaded) =>
    downloaded.forEach((feature) => Globalize.load(feature))
  );
}

(async function () {
  await loadIntoGlobalize(
    supplementalUrlsFor(supplementals)
  );

  await setLocale(defaultLocale);

  bindLocaleSwitcher(defaultLocale);
})();
