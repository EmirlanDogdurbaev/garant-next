"use client";

import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import i18n from "@/i18n";
import {
    fetchLanguages,
    setSelectedLanguage,
} from "@/store/slices/languages/languageSlice";
import styles from "./NavBar.module.scss";
import Logo from "@/components/Logo/Logo";
import {useRouter} from "next/navigation";
import {fetchByDistributivFilter, fetchByProducerFilter, fetchByProducerIsPainted} from "@/store/slices/filter/search";

const NavBar = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const router = useRouter();

    const {languages, loading, error} = useSelector((state) => state.language);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

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

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Logo/>
                <ul className={styles.menu}>
                    <li
                        className={styles.menuItem}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {t("nav.production")}
                        {isDropdownOpen && (
                            <div className={styles.dropdown} style={{minWidth: "250px"}}>
                                <button
                                    onClick={() =>
                                        handleSearchAndNavigate(fetchByProducerFilter, "/catalog")
                                    }
                                >
                                    {t("nav.item1")}
                                </button>
                                <button
                                    onClick={() =>
                                        handleSearchAndNavigate(fetchByProducerIsPainted, "/catalog")
                                    }
                                >
                                    {t("nav.item2")}
                                </button>
                            </div>
                        )}
                    </li>
                    <li className={styles.menuItem}>
                        <button onClick={() =>
                            handleSearchAndNavigate(fetchByDistributivFilter, "/catalog")
                        }>{t("nav.distribution")}</button>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/vacancies">{t("nav.vacancies")}</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <button className={styles.currentLanguage}>
                            {i18n.language.toUpperCase()}
                        </button>
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownMenu} style={{minWidth: "80px"}}>
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
            </nav>
        </header>
    );
};

export default NavBar;
