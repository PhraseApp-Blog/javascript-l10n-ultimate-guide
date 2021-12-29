const defaultLocale = "ar";
const supplementals = [
  "likelySubtags",
  "plurals",
  "ordinals",
];

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
  await Promise.all(
    supplementals.map((supplemental) =>
      fetchJson(
        `/lib/cldr-json/cldr-core/supplemental/${supplemental}.json`
      )
    )
  ).then((downloadedSupplementals) => {
    downloadedSupplementals.forEach((ds) =>
      Globalize.load(ds)
    );
  });

  await setLocale(defaultLocale);

  bindLocaleSwitcher(defaultLocale);
})();
