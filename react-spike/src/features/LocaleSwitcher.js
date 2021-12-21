function LocaleSwitcher() {
  return (
    <>
      <img
        src="img/translation-icon@2x.png"
        className="translation-icon"
      />

      <select className="locale-switcher">
        <option value="en">English</option>
        <option value="ar">Arabic (العربية)</option>
      </select>
    </>
  );
}

export default LocaleSwitcher;
