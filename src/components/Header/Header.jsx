"use client";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "../../i18n";
import styles from "./Header.module.scss";

import { Fade } from "react-slideshow-image";
import Link from "next/link";
import React from "react";

import img6 from "../../../public/a.jpg";
import img7 from "../../../public/b.jpg";
import img8 from "../../../public/c.jpg";
import "react-slideshow-image/dist/styles.css";

const Header = () => {
    const { t } = useTranslation();
    const selectedLanguage = useSelector(
        (state) => state.language.selectedLanguage
    );

    // Используем состояние для сброса ключа при каждом возврате
    const [key, setKey] = useState(0);

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    useEffect(() => {
        // Сброс ключа компонента при каждом возврате на страницу
        setKey((prevKey) => prevKey + 1);
    }, []);

    const settings = {
        duration: 1000,
        transitionDuration: 3000,
        infinite: true,
        indicators: false,
        arrows: false,
    };

    const backgrounds = [img7,img6,img8];

    return (
        <section className={styles.sliderContainer}>
            {/* Добавляем ключ, чтобы принудительно пересоздать компонент */}
            <Fade key={key} {...settings}>
                {backgrounds.map((bg, index) => (
                    <div
                        key={index}
                        className={styles.bgSlide}
                        style={{ backgroundImage: `url("${bg.src}")` }}
                    />
                ))}
            </Fade>

            <div className={styles.content}>
                <div className={styles.container}>
                    {/* <span>
                        <h1>{t("header.title")}</h1>
                        <h4>{t("header.subtitle")}</h4>
                    </span> */}
                    <section className={styles.b2b}>
                        <p>{t("header.b2b")}</p>
                    </section>
                    <p className={styles.desk}>{t("header.description")}</p>
                    <Link href={"/catalog"} className={styles.btn_to_category}>
                        {t("header.toCatalog")}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Header;
