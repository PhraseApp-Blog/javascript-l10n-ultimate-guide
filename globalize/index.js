async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
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

(async function () {
  const likelySubtags = await fetchJson(
    "/lib/cldr-json/cldr-core/supplemental/likelySubtags.json"
  );

  Globalize.load(likelySubtags);

  Globalize.loadMessages({
    en: {
      "app-title": "Hello Globalize!",
    },
    ar: {
      "app-title": "أهلاً جلوبالايز",
    },
  });

  Globalize.locale("en");

  translatePageElements();
})();
