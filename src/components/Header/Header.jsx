import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import i18n from "../../i18n";
import styles from "./Header.module.scss";
import {Fade} from "react-slideshow-image";
import Link from "next/link";
import React from 'react';
import img1 from "../../../public/img1.jpg"
import img2 from "../../../public/img2.jpg"
import img3 from "../../../public/img3.jpg"
import img4 from "../../../public/img4.jpg"
import img5 from "../../../public/img5.jpg"
import 'react-slideshow-image/dist/styles.css'

const Header = () => {
    const {t} = useTranslation();
    const selectedLanguage = useSelector(
        (state) => state.language.selectedLanguage
    );

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const settings = {
        duration: 1000,
        transitionDuration: 3000,
        infinite: true,
        indicators: false,
        arrows: false,
    };

    const backgrounds = [
        img1,
        img2,
        img3,
        img4,
        img5,
    ];


    return (
        <section className={styles.sliderContainer}>
            <Fade {...settings}>
                {backgrounds.map((bg, index) => (
                    <div
                        key={index}
                        className={styles.bgSlide}
                        style={{backgroundImage: `url("${bg.src}") !important` }}
                    />
                ))}
            </Fade>

            <div className={styles.content}>
                <div className={styles.container}>
          <span>
            <h1>{t("header.title")}</h1>
            <h4>{t("header.subtitle")}</h4>
          </span>
                    <section className={styles.b2b}>
                        <p>{t("header.b2b")}</p>
                    </section>
                    <p className={styles.desk}>{t("header.description")}</p>
                    <Link href={"/page"} className={styles.btn_to_category}>
                        {t("header.toCatalog")}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Header;
