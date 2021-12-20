import i18next from "i18next";
import HttpApi from "i18next-http-backend";

async function initI18next() {
  await i18next.use(HttpApi).init({
    lng: "ar",
    debug: true,
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    backend: {
      loadPath: "/lang/{{lng}}.json",
    },
  });
}

function translatePageElements() {
  const translatableElements = document.querySelectorAll(
    "[data-i18n-key]",
  );
  translatableElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    el.innerHTML = i18next.t(key);
  });
}

// Init
(async function () {
  await initI18next();
  translatePageElements();
})();
