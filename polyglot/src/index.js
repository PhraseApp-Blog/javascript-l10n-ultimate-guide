import Polyglot from "node-polyglot";

const polyglot = new Polyglot();

polyglot.extend({
  "app-title": "مع بوليجلوت",
});

const element = document.querySelector(
  "[data-i18n-key='app-title']",
);

element.innerHTML = polyglot.t("app-title");
