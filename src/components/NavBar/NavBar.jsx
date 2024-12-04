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
import classes from "./NavBar.module.scss";
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
        <>
            <nav className={classes.Nav}>
                <>
                    <div
                        className={`${classes.bottom_nav} ${
                            isMenuOpen ? classes.active : ""
                        }`}
                    >
                        <nav className={classes.nav}>

                            <Logo/>

                            <ul>
                                <div className={classes.navItem}>
                                    <div className={classes.languageSelector}>
                                        {t("nav.production")}
                                        <div className={classes.dropdownMenu}>
                                            <div className={`${classes.inner} ${classes.custom}`}>
                                                <div onClick={() =>
                                                    handleSearchAndNavigate(fetchByProducerFilter, "/catalog")
                                                }>
                                                    {t("nav.item1")}
                                                </div>
                                                <div onClick={() =>
                                                    handleSearchAndNavigate(fetchByProducerIsPainted, "/catalog")}>
                                                    {t("nav.item2")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={classes.languageSelector}
                                    onClick={() =>
                                        handleSearchAndNavigate(fetchByDistributivFilter, "/catalog")}
                                >
                                    {t("nav.distribution")}
                                </div>

                                <Link className={classes.link} href={"/vacancies"}>{t("nav.vacancies")}</Link>

                                <div className={classes.languageSelector}>
                                    {i18n.language.toUpperCase()}
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
                                </div>
                            </ul>
                            <div className={classes.burger} onClick={toggleMenu}>
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 8H28M4 16H28M4 24H28"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </nav>
                    </div>
                    {isMenuOpen && (
                        <div
                            className={`${classes.mobileMenu} ${
                                isMenuOpen ? classes.active : ""
                            }`}
                        >
                            <div onClick={toggleMenu}>
                                <svg
                                    width="41"
                                    height="40"
                                    viewBox="0 0 41 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M34.1667 35.1876C33.9426 35.1903 33.7205 35.1466 33.5145 35.0594C33.3086 34.9722 33.1234 34.8434 32.9708 34.6813L5.6375 7.68131C4.95417 7.00631 4.95417 5.96006 5.6375 5.28506C6.32083 4.61006 7.38 4.61006 8.06333 5.28506L35.3625 32.3188C36.0458 32.9938 36.0458 34.0401 35.3625 34.7151C35.0208 35.0526 34.5767 35.2213 34.1667 35.2213V35.1876Z"
                                        fill="#212529"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M6.83333 35.1875C6.60928 35.1902 6.38714 35.1466 6.18119 35.0594C5.97524 34.9722 5.79004 34.8434 5.6375 34.6813C4.95417 34.0063 4.95417 32.96 5.6375 32.285L32.9708 5.31875C33.6542 4.64375 34.7133 4.64375 35.3967 5.31875C36.08 5.99375 36.08 7.04 35.3967 7.715L8.02917 34.6813C7.6875 35.0188 7.24333 35.1875 6.83333 35.1875Z"
                                        fill="#212529"
                                        fillOpacity="0.8"
                                    />
                                </svg>
                            </div>
                            <ul>
                                <Link href="/">{t("nav.production")}</Link>
                                <Link href="/ax">{t("nav.distribution")}</Link>
                                <Link href="/vacancy">{t("nav.vacancies")}</Link>
                                <Link href="/ax">{t("nav.language")}</Link>
                            </ul>
                        </div>
                    )}
                </>

            </nav>
        </>
    );
};

export default NavBar;
