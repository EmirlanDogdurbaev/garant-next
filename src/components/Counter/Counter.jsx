"use client"

import styles from './Counter.module.scss';
import CounterCard from "./CounterCard/CounterCard.jsx";
import { useTranslation } from "react-i18next";
import React from 'react';
const Counter = () => {
    const { t } = useTranslation();

    const data = [
        {
            count: `10 ${t("about.years")}`,
            description: t("about.years2"),
            id: 2
        },
        {
            count: "70 000+",
            description: t("about.customer"),
            id: 1
        },
        {
            count: "70 000~",
            description: t("about.prod"),
            id: 3
        }
    ];

    return (
        <div className={styles.Counter}>
            {data.map((item, index) => (
                <CounterCard key={index} counter={item} />
            ))}
        </div>
    );
}

export default Counter;
