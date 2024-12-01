"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import i18n from "@/i18n";
import {
  fetchLanguages,
  setSelectedLanguage,
} from "@/store/slices/languages/languageSlice";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { languages, loading, error } = useSelector((state) => state.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Загружаем языки при монтировании
  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  // Проверяем, авторизован ли пользователь
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Меняем язык в i18next
    dispatch(setSelectedLanguage(lang)); // Обновляем состояние Redux
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  if (loading) return <div>{t("loading.languages")}</div>;
  if (error)
    return (
      <div>
        {t("error.loading.languages")}: {error}
      </div>
    );

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
             Iskender   
        </Link>
        <span className={styles.subtitle}>Sanitary ware</span>
      </div>
      <ul className={styles.menu}>
        <li
          className={styles.menuItem}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {t("nav.production")}   
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <Link href="/standard-collections">
                   {t("nav.item1")}   
              </Link>
              <Link href="/painted-collections">
                   {t("nav.item2")}   
              </Link>
            </div>
          )}
        </li>
        <li className={styles.menuItem}>
          <Link href="/distribution">
               {t("nav.distribution")}   
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/vacancies">
               {t("nav.vacancies")}   
          </Link>
        </li>
        <li className={styles.menuItem}>
          <div className={styles.dropdown}>
            <button>{i18n.language.toUpperCase()}</button>
            <div className={styles.dropdownMenu}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </li>
      </ul>
      <div className={styles.auth}>
        {isLoggedIn ? (
          <button onClick={() => localStorage.removeItem("token")}>
            {t("logout")}
          </button>
        ) : (
          <Link href="/login">
               {t("login")}   
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
