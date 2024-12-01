import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from "../../i18n";
import styles from "./Header.module.scss";
const Header = () => {
  const { t } = useTranslation();
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <section>
      <div>
        <h4>axax</h4>
      </div>
    </section>
  );
};

export default Header;
