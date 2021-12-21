import { useTranslation } from "react-i18next";

function LocaleSwitcher() {
  const { i18n } = useTranslation();

  return (
    <>
      <img
        src="img/translation-icon@2x.png"
        alt="Translation icon"
        className="translation-icon"
      />

      <select
        className="locale-switcher"
        value={i18n.language}
        onChange={(e) =>
          i18n.changeLanguage(e.target.value)
        }
      >
        <option value="en">English</option>
        <option value="ar">Arabic (العربية)</option>
      </select>
    </>
  );
}

export default LocaleSwitcher;
