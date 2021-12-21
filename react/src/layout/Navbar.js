import LocaleSwitcher from "../features/LocaleSwitcher";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-list navbar-start">
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              {t("home")}
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              {t("about")}
            </a>
          </li>
        </ul>
        <div className="navbar-end">
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
