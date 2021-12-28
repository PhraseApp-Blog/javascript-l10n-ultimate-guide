// /lib/cldr-json/cldr-core/supplemental/likelySubtags.json
// lib/cldr-json/cldr-localenames-full/main/en/languages.json
(async function () {
  const languagesData = await fetch(
    "lib/cldr-json/cldr-localenames-full/main/en/languages.json"
  );
  const languagesJson = await languagesData.json();
  Globalize.load(languagesJson);

  const likelySubtagData = await fetch(
    "/lib/cldr-json/cldr-core/supplemental/likelySubtags.json"
  );
  const likelySubtagJson = await likelySubtagData.json();
  Globalize.load(likelySubtagJson);

  Globalize.loadMessages({
    en: {
      like: [
        "{0, plural, offset:1",
        "     =0 {Be the first to like this}",
        "     =1 {You liked this}",
        "    one {You and someone else liked this}",
        "  other {You and # others liked this}",
        "}",
      ],
    },
  });

  document.querySelector(
    '[data-i18n-key="app-title"'
  ).innerHTML = Globalize("en").messageFormatter("like")(1);
})();
