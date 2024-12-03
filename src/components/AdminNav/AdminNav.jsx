import React from 'react';
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import styles from "./AdminNav.module.scss"

const AdminNav = () => {
    return (
        <header className={styles.header}>
            <nav>
                <Logo/>
                <ul>
                    <li>
                        <Link href={"/admin/products/allProducts"}>Все товары</Link>
                        <Link href={"/admin/collections/"}>Все коллекции</Link>
                        <Link href={"/admin/discount/"}>Акции</Link>
                        <Link href={"/admin/vacancies/"}>Вакансии</Link>
                        <Link href={"/admin/brands/"}>Клиенты</Link>
                        <Link href={"/admin/category/"}>Категории</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AdminNav;