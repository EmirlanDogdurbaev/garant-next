import styles from "./Footer.module.scss";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchVacancies} from "@/store/slices/vacancies/vacanciesSlice";
import Link from "next/link";
import {FaPhone} from "react-icons/fa";
import React from 'react';
const Footer = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {vacancies} = useSelector((state) => state.vacancies);

    useEffect(() => {
        dispatch(fetchVacancies())
    }, [dispatch])

    const data3 = vacancies.slice(0, 3);
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.map}>
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.550353012155!2d74.57187427432002!3d42.87462257915624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec819891ce20f%3A0x9632671e0b842a48!2z0YPQuy4g0JzQtdGA0LrQsNGC0L3QuNGP!5e0!3m2!1sru!2skg!4v1700000000000"
                        width="100%"
                        height="300"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                <div className={styles.info}>
                    <div className={styles.adresses}>
                        <h6>{t("footer.addresses")}</h6>
                        <ul>
                            <Link href="https://maps.app.goo.gl/JdbygE2Ehi4WX5VA9">
                                <p>
                                    <b>{t("footer.city1")}: </b>
                                    <br/>
                                    {t("footer.address1")}
                                </p>
                            </Link>
                            <Link href="https://maps.app.goo.gl/cJjc97mkECiUzkVJ8">
                                <p>
                                    <b>{t("footer.city2")}: </b>
                                    <br/>
                                    {t("footer.address2")}
                                </p>
                            </Link>
                        </ul>
                    </div>
                    <div className={styles.contacts}>
                        <h6>{t("footer.contacts")}</h6>
                        <ul>
                            <li>
                                <a href="tel:+996500000104">
                                    <FaPhone className={styles.icon}/> +996 500 000 104
                                </a>
                            </li>
                            <li>
                                <a href="tel:+996997000104">
                                    {" "}
                                    <FaPhone className={styles.icon}/> +996 997 000 104
                                </a>
                            </li>
                            <li>
                                <a href="tel:+996222000104">
                                    {" "}
                                    <FaPhone className={styles.icon}/> +996 222 000 104
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.vacancies}>
                        <h6>{t("footer.vacancies")}</h6>
                        <ul>

                            {data3.map((vacancies) => (
                                <li key={vacancies.id}>
                                    <Link href={`/vacancies`}>{vacancies.title}</Link>
                                </li>
                            ))}
                            <Link href="/vacancies">{t("footer.see_more")}</Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>
                    Первый отечественный бренд на рынке сантехники от компании ОсОО "Стройдом.кг".
                    <br/>
                    © 2023 Iskender.kg – Отечественный бренд сантехники
                </p>
            </div>
        </footer>
    );
};

export default Footer;
