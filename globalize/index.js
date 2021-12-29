async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
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

  document.querySelector(
    "[data-i18n-key='app-title']"
  ).textContent = Globalize.formatMessage("app-title");
})();
