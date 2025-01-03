'use client'
import styles from './CompanyGoal.module.scss'
import {useTranslation} from "react-i18next";
import React from 'react';

const CompanyGoal = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.wrapper}>
            <div className={styles.inbox}>
                <p className={styles.left}><span>{t("about.garant")}</span> {t("about.title")} </p>
                <div className={styles.line}/>
                <p className={styles.right}>{t("about.description")} </p>
            </div>
        </div>
    )
}

export default CompanyGoal;