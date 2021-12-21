import { useTranslation } from "react-i18next";
import Navbar from "./layout/Navbar";
import "./App.css";

function App() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <Navbar />

      <h1>{t("app-title")}</h1>

      <p>
        Welcome to my little spot on the interwebs, user
      </p>
      <p>You have count new messages</p>
    </div>
  );
}

export default App;
