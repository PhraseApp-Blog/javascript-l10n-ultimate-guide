function initLocaleSwitcher(defaultLocale) {
  const switcher = document.querySelector(
    "[data-i18n-switcher]"
  );

  switcher.value = defaultLocale;

  switcher.onchange = (e) => {
    loadLocaleAndTranslatePage(e.target.value);
  };
}
