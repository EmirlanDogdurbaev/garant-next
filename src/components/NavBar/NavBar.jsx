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
import Logo from "@/components/Logo/Logo";
import { useRouter } from "next/navigation";
import {
  fetchByDistributivFilter,
  fetchByProducerFilter,
  fetchByProducerIsPainted,
} from "@/store/slices/filter/search";
import classes from "./NavBar.module.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  const { languages, loading, error } = useSelector((state) => state.language);

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuActive]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleSearchAndNavigate = (action, path) => {
    dispatch(action());
    router.push(path);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    dispatch(setSelectedLanguage(lang));
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

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  return (
    <header className={classes.main}>
      <nav className={classes.navbar}>
        <Logo />
        <div
          className={`${classes.navbar__list} ${
            isMenuActive ? classes.active : ""
          }`}
        >
          {isMenuActive ? (
            <ul className={classes.modile}>
              <li>
                <button> {t("nav.production")}</button>
              </li>{" "}
              <li>
                <button
                  onClick={() =>
                    handleSearchAndNavigate(fetchByProducerFilter, "/catalog")
                  }
                >
                  {t("nav.item1")}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleSearchAndNavigate(
                      fetchByProducerIsPainted,
                      "/catalog"
                    )
                  }
                >
                  {t("nav.item2")}
                </button>
              </li>{" "}
              <li>
                <button
                  onClick={() =>
                    handleSearchAndNavigate(
                      fetchByDistributivFilter,
                      "/catalog"
                    )
                  }
                >
                  {t("nav.distribution")}
                </button>
              </li>
              <li>
                <Link className={classes.navbar__link} href="/vacancies">
                  {t("nav.vacancies")}
                </Link>
              </li>
              <li>
                <button><svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 22.75C11.6581 22.75 10.3942 22.4936 9.20834 21.9808C8.02245 21.4673 6.98967 20.7704 6.11001 19.89C5.23034 19.0096 4.53339 17.9768 4.01917 16.7917C3.50495 15.6065 3.24856 14.3426 3.25001 13C3.25001 11.6538 3.50639 10.3888 4.01917 9.20508C4.53267 8.02064 5.22962 6.98894 6.11001 6.11C6.99039 5.23106 8.02317 4.53411 9.20834 4.01917C10.3942 3.50639 11.6581 3.25 13 3.25C14.3462 3.25 15.6112 3.50639 16.7949 4.01917C17.9794 4.53267 19.0114 5.22961 19.8911 6.11C20.7708 6.99039 21.4673 8.02208 21.9808 9.20508C22.4936 10.3895 22.75 11.6545 22.75 13C22.75 14.3419 22.4936 15.6058 21.9808 16.7917C21.4673 17.9776 20.7704 19.0103 19.89 19.89C19.0096 20.7697 17.9779 21.4666 16.7949 21.9808C15.6119 22.4951 14.3469 22.7514 13 22.75ZM13 21.6753C13.6356 20.8585 14.1599 20.0565 14.573 19.2692C14.9854 18.482 15.3209 17.6009 15.5794 16.6259H10.4206C10.7073 17.6558 11.0496 18.5644 11.4476 19.3516C11.8463 20.1388 12.3637 20.9134 13 21.6753ZM11.6209 21.5128C11.1154 20.917 10.6539 20.1803 10.2364 19.3028C9.81898 18.4261 9.50842 17.5334 9.30476 16.6248H5.15017C5.77128 17.9718 6.65131 19.0768 7.79026 19.9398C8.92992 20.8022 10.2068 21.3265 11.6209 21.5128ZM14.3791 21.5128C15.7932 21.3265 17.0701 20.8022 18.2098 19.9398C19.3487 19.0768 20.2287 17.9718 20.8498 16.6248H16.6963C16.4219 17.5471 16.0763 18.4466 15.6596 19.3234C15.2421 20.2009 14.8153 20.9314 14.3791 21.5128ZM4.70817 15.5426H9.07942C8.99709 15.0977 8.93931 14.6644 8.90609 14.2426C8.87142 13.8215 8.85409 13.4073 8.85409 13C8.85409 12.5927 8.87106 12.1785 8.90501 11.7574C8.93895 11.3364 8.99673 10.903 9.07834 10.4574H4.70926C4.59153 10.833 4.49945 11.2421 4.43301 11.6848C4.36656 12.1268 4.33334 12.5652 4.33334 13C4.33334 13.4348 4.3662 13.8735 4.43192 14.3162C4.49764 14.759 4.58973 15.1674 4.70817 15.5415M10.1628 15.5415H15.8373C15.9196 15.0973 15.9774 14.6712 16.0106 14.2632C16.0453 13.8558 16.0626 13.4348 16.0626 13C16.0626 12.5652 16.0456 12.1442 16.0117 11.7368C15.9777 11.3295 15.9199 10.9034 15.8383 10.4585H10.1617C10.0801 10.9027 10.0223 11.3288 9.98834 11.7368C9.95439 12.1442 9.93742 12.5652 9.93742 13C9.93742 13.4348 9.95439 13.8558 9.98834 14.2632C10.0223 14.6705 10.0811 15.0966 10.1628 15.5415ZM16.9217 15.5415H21.2918C21.4096 15.1667 21.5016 14.7582 21.5681 14.3162C21.6338 13.8735 21.6667 13.4348 21.6667 13C21.6667 12.5652 21.6338 12.1265 21.5681 11.6837C21.5024 11.241 21.4103 10.8326 21.2918 10.4585H16.9206C17.0029 10.9027 17.0607 11.3356 17.0939 11.7574C17.1286 12.1792 17.1459 12.5934 17.1459 13C17.1459 13.4066 17.1289 13.8208 17.095 14.2426C17.0611 14.6644 17.0033 15.0977 16.9217 15.5426M16.6963 9.37517H20.8498C20.215 8.00006 19.3454 6.89506 18.2412 6.06017C17.1369 5.22528 15.8495 4.69408 14.3791 4.46658C14.8846 5.13175 15.3393 5.89261 15.743 6.74917C16.1467 7.605 16.4645 8.48033 16.6963 9.37517ZM10.4206 9.37517H15.5794C15.2934 8.35828 14.9406 7.43889 14.521 6.617C14.1014 5.79511 13.5944 5.031 13 4.32467C12.4056 5.03028 11.8986 5.79439 11.479 6.617C11.0594 7.43961 10.7059 8.359 10.4206 9.37517ZM5.15126 9.37517H9.30476C9.53659 8.48106 9.85437 7.60572 10.2581 6.74917C10.6618 5.89261 11.1164 5.13175 11.622 4.46658C10.1386 4.69481 8.84795 5.22925 7.75017 6.06992C6.65239 6.91203 5.78573 8.01342 5.15017 9.37408"
                      fill="#fff"
                    />
                  </svg>{i18n.language.toUpperCase()}</button>
              </li>
              <li>
                {" "}
                {languages?.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </button>
                ))}
              </li>
            </ul>
          ) : (
            <>
              <div className={classes.languageSelector}>
                {t("nav.production")}
                <div className={classes.dropdownMenu}>
                  <div className={`${classes.inner} ${classes.custom}`}>
                    <div
                      onClick={() =>
                        handleSearchAndNavigate(
                          fetchByProducerFilter,
                          "/catalog"
                        )
                      }
                    >
                      {t("nav.item1")}
                    </div>
                    <div
                      onClick={() =>
                        handleSearchAndNavigate(
                          fetchByProducerIsPainted,
                          "/catalog"
                        )
                      }
                    >
                      {t("nav.item2")}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${classes.inner2} ${classes.custom}`}>
                <div
                  onClick={() =>
                    handleSearchAndNavigate(fetchByProducerFilter, "/catalog")
                  }
                >
                  {t("nav.item1")}
                </div>
                <div
                  onClick={() =>
                    handleSearchAndNavigate(
                      fetchByProducerIsPainted,
                      "/catalog"
                    )
                  }
                >
                  {t("nav.item2")}
                </div>
              </div>
              <div
                className={`${classes.navbar__link} ${classes.languageSelector}`}
                onClick={() =>
                  handleSearchAndNavigate(fetchByDistributivFilter, "/catalog")
                }
              >
                {t("nav.distribution")}
              </div>

              <li className={classes.navbar__item}>
                <Link className={classes.navbar__link} href="/vacancies">
                  {t("nav.vacancies")}
                </Link>
              </li>

              <div className={classes.languageSelector}>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 22.75C11.6581 22.75 10.3942 22.4936 9.20834 21.9808C8.02245 21.4673 6.98967 20.7704 6.11001 19.89C5.23034 19.0096 4.53339 17.9768 4.01917 16.7917C3.50495 15.6065 3.24856 14.3426 3.25001 13C3.25001 11.6538 3.50639 10.3888 4.01917 9.20508C4.53267 8.02064 5.22962 6.98894 6.11001 6.11C6.99039 5.23106 8.02317 4.53411 9.20834 4.01917C10.3942 3.50639 11.6581 3.25 13 3.25C14.3462 3.25 15.6112 3.50639 16.7949 4.01917C17.9794 4.53267 19.0114 5.22961 19.8911 6.11C20.7708 6.99039 21.4673 8.02208 21.9808 9.20508C22.4936 10.3895 22.75 11.6545 22.75 13C22.75 14.3419 22.4936 15.6058 21.9808 16.7917C21.4673 17.9776 20.7704 19.0103 19.89 19.89C19.0096 20.7697 17.9779 21.4666 16.7949 21.9808C15.6119 22.4951 14.3469 22.7514 13 22.75ZM13 21.6753C13.6356 20.8585 14.1599 20.0565 14.573 19.2692C14.9854 18.482 15.3209 17.6009 15.5794 16.6259H10.4206C10.7073 17.6558 11.0496 18.5644 11.4476 19.3516C11.8463 20.1388 12.3637 20.9134 13 21.6753ZM11.6209 21.5128C11.1154 20.917 10.6539 20.1803 10.2364 19.3028C9.81898 18.4261 9.50842 17.5334 9.30476 16.6248H5.15017C5.77128 17.9718 6.65131 19.0768 7.79026 19.9398C8.92992 20.8022 10.2068 21.3265 11.6209 21.5128ZM14.3791 21.5128C15.7932 21.3265 17.0701 20.8022 18.2098 19.9398C19.3487 19.0768 20.2287 17.9718 20.8498 16.6248H16.6963C16.4219 17.5471 16.0763 18.4466 15.6596 19.3234C15.2421 20.2009 14.8153 20.9314 14.3791 21.5128ZM4.70817 15.5426H9.07942C8.99709 15.0977 8.93931 14.6644 8.90609 14.2426C8.87142 13.8215 8.85409 13.4073 8.85409 13C8.85409 12.5927 8.87106 12.1785 8.90501 11.7574C8.93895 11.3364 8.99673 10.903 9.07834 10.4574H4.70926C4.59153 10.833 4.49945 11.2421 4.43301 11.6848C4.36656 12.1268 4.33334 12.5652 4.33334 13C4.33334 13.4348 4.3662 13.8735 4.43192 14.3162C4.49764 14.759 4.58973 15.1674 4.70817 15.5415M10.1628 15.5415H15.8373C15.9196 15.0973 15.9774 14.6712 16.0106 14.2632C16.0453 13.8558 16.0626 13.4348 16.0626 13C16.0626 12.5652 16.0456 12.1442 16.0117 11.7368C15.9777 11.3295 15.9199 10.9034 15.8383 10.4585H10.1617C10.0801 10.9027 10.0223 11.3288 9.98834 11.7368C9.95439 12.1442 9.93742 12.5652 9.93742 13C9.93742 13.4348 9.95439 13.8558 9.98834 14.2632C10.0223 14.6705 10.0811 15.0966 10.1628 15.5415ZM16.9217 15.5415H21.2918C21.4096 15.1667 21.5016 14.7582 21.5681 14.3162C21.6338 13.8735 21.6667 13.4348 21.6667 13C21.6667 12.5652 21.6338 12.1265 21.5681 11.6837C21.5024 11.241 21.4103 10.8326 21.2918 10.4585H16.9206C17.0029 10.9027 17.0607 11.3356 17.0939 11.7574C17.1286 12.1792 17.1459 12.5934 17.1459 13C17.1459 13.4066 17.1289 13.8208 17.095 14.2426C17.0611 14.6644 17.0033 15.0977 16.9217 15.5426M16.6963 9.37517H20.8498C20.215 8.00006 19.3454 6.89506 18.2412 6.06017C17.1369 5.22528 15.8495 4.69408 14.3791 4.46658C14.8846 5.13175 15.3393 5.89261 15.743 6.74917C16.1467 7.605 16.4645 8.48033 16.6963 9.37517ZM10.4206 9.37517H15.5794C15.2934 8.35828 14.9406 7.43889 14.521 6.617C14.1014 5.79511 13.5944 5.031 13 4.32467C12.4056 5.03028 11.8986 5.79439 11.479 6.617C11.0594 7.43961 10.7059 8.359 10.4206 9.37517ZM5.15126 9.37517H9.30476C9.53659 8.48106 9.85437 7.60572 10.2581 6.74917C10.6618 5.89261 11.1164 5.13175 11.622 4.46658C10.1386 4.69481 8.84795 5.22925 7.75017 6.06992C6.65239 6.91203 5.78573 8.01342 5.15017 9.37408"
                      fill="#fff"
                    />
                  </svg>

                  {i18n.language.toUpperCase()}
                </span>
                <div className={classes.dropdownMenu}>
                  <div className={classes.inner}>
                    {languages?.map((language) => (
                      <div
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                      >
                        {language.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes.inner2}>
                  {languages?.map((language) => (
                    <div
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      {language.name}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button className={classes.navbar__menu} onClick={toggleMenuHandler}>
          {isMenuActive ? (
            <svg
              width="40"
              height="40"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.69629 18.3028L18.3038 7.69531M18.3038 18.3028L7.69629 7.69531"
                stroke="#fff"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
