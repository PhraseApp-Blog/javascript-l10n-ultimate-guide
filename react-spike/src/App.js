import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./layout/Navbar";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  return (
    <div className="container">
      <Navbar />

      <h1>{t("app-title")}</h1>

      <p>{t("lead", { username: "Samus" })}</p>
      <p>{t("new-messages", { count: 12 })}</p>
    </div>
  );
}

export default App;
