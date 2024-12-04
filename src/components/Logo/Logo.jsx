"use client"

import React from 'react';
import styles from "./Logo.module.scss";
import Link from "next/link";
import logo from "../../../public/logo.svg"

const Logo = () => {
    return (
        <>
            <Link href={"/"} className={styles.logo}>
                <img src={logo} alt=""/>
            </Link></>

    );
};

export default Logo;