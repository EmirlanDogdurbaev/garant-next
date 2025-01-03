import { useState } from "react";
import styles from "./JobCard.module.scss";
import React from 'react';
import {useTranslation} from "react-i18next";
const JobCard = ({ job }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.jobCard}>
            <div className={styles.header} onClick={toggleDetails}>
                <h3 className={styles.title}>{job.title}</h3>
                <div className={styles.divided}>
                    <span className={styles.salary}>{job.salary} {t("vacancies.currency")}</span>
                    <button className={styles.toggleButton}>{isOpen ? "-" : "+"}</button>
                </div>
            </div>

            <div className={`${styles.details} ${isOpen ? styles.detailsOpen : ""}`}>
                <div className={styles.section}>
                    <h4>{t("vacancies.title")}</h4>
                    <ul className={styles.list}>
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>{t("vacancies.responsibilities")}</h4>
                    <ul className={styles.list}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {job.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>{t("vacancies.terms")}</h4>
                    <ul className={styles.list}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {job.conditions.map((cond, index) => (
                            <li key={index}>{cond}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>{t("vacancies.information")}</h4>
                    <p>{job.additionalInfo}</p>
                </div>

                <div className={styles.section}>
                    <a
                        href={`https://wa.me/+996705088199?text=Я%20хочу%20откликнуться%20на%20вашу%20вакансию`}
                        className={styles.applyButton}
                    >
                        {t("vacancies.apply")}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
