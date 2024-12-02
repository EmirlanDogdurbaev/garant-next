"use client"

import React from 'react';
import styles from "./Logo.module.scss";
import Link from "next/link";

const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link href="/">Garant premium</Link>
            <span className={styles.subtitle}>Sanitary ware</span>
        </div>

    );
};

export default Logo;