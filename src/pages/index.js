import Header from "@/components/Header/Header.jsx";
import Counter from "@/components/Counter/Counter";
import CompanyGoal from "@/components/CompanyGoal/CompanyGoal";
import DiscountProductCard from "@/components/DiscountProductCard/DiscountProductCard";
import SwitchSection from "@/components/SwitchSection/SwitchSection";
import Catalog from "@/components/Catalog/Catalog";
import Reviews from "@/components/Reviews/Reviews";
import Brands from "@/components/Brands/Brands";
import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import React from 'react';

export default function Home() {
    return (
        <>
            <Head>
                <title>Garant Premium | Garant asia premium | У нас вы найдете лучшие товары по выгодным ценам </title>
                <meta name="description"
                      content="Добро пожаловать в наш магазин! У нас вы найдете лучшие товары по выгодным ценам."/>
                <meta name="keywords" content="Магазин, Товары, Покупка, Скидки, Бренды, Отзывы"/>
                <meta property="og:title" content=" Garant Premium | Garant asia premium | Iskender  Главная | "/>
                <meta property="og:description"
                      content="Лучшие товары, скидки и бренды в одном месте. Покупайте прямо сейчас!"/>
                <meta property="og:image" content="/path-to-default-image.jpg"/>
                <meta property="og:url" content="https://garant-asia.com"/>
                <meta property="og:type" content="website"/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content=" Garant Premium || Iskender  Главная |"/>
                <meta name="twitter:description"
                      content="Лучшие товары, скидки и бренды в одном месте. Покупайте прямо сейчас!"/>
                <meta name="twitter:image" content="/path-to-default-image.jpg"/>
                <link rel="canonical" href="https://garant-asia.com"/>
                <link rel="icon" type="image/svg+xml" href="/logo_black.svg"/>
            </Head>

            <Layout>
                <Header/>
                <Counter/>
                <CompanyGoal/>
                <DiscountProductCard/>
                <SwitchSection/>
                <Catalog/>
                <Reviews/>
                <Brands/>
            </Layout>
        </>
    );
}
