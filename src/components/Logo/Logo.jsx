"use client"

import React from 'react';
import styles from "./Logo.module.scss";
import Link from "next/link";

const Logo = () => {
    return (
        <>
            <Link href={"/"} className={styles.logo}>
                <img src="../../../public/logov1.svg" alt=""/>
            </Link></>

    );
};

export default Logo;