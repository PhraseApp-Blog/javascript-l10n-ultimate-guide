async function loadMainLocaleData(locales) {
  return fetchJsonFromUrlTemplate(
    mainLocaleDataUrlTpl,
    "locale",
    locales
  );
}

async function loadSupplementals(features) {
  return fetchJsonFromUrlTemplate(
    supplementalUrlTpl,
    "feature",
    features
  );
}

async function loadMessagesFor(urlTemplate, locale) {
  const data = await fetch(
    urlTemplate.replace("{locale}", locale)
  );
  return await data.json();
}

async function fetchJsonFromUrlTemplate(
  urlTemplate,
  key,
  replacements
) {
  return Promise.all(
    replacements.map((replacement) =>
      fetch(urlTemplate.replace(`{${key}}`, replacement))
    )
  ).then((response) =>
    Promise.all(response.map((r) => r.json()))
  );
}
