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
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Iskender Group – Магазин лучших товаров в Кыргызстане</title>
        <meta
          name="description"
          content="Iskender Group – широкий выбор товаров с гарантией качества. Выгодные цены, скидки и самые популярные бренды."
        />
        <meta
          name="keywords"
          content="Магазин Кыргызстан, Товары, Покупка, Скидки, Бренды, Гарантия, Iskender.kg"
        />

        <meta
          property="og:title"
          content="Iskender Group – Лучшие товары в Кыргызстане"
        />
        <meta
          property="og:description"
          content="Iskender Group – ваш лучший выбор для покупок. Качественные товары, доступные цены и отличное обслуживание."
        />
        <meta property="og:image" content="/iskender_main.svg" />
        <meta property="og:url" content="https://iskender.kg" />
        <meta property="og:type" content="website" />

        <meta property="insta:card" content="summary_large_image" />
        <meta
          property="insta:title"
          content="Iskender Group | Лучшие товары и скидки"
        />
        <meta
          property="insta:description"
          content="Широкий выбор товаров в Кыргызстане. Покупайте качественные товары по отличным ценам!"
        />
        <meta property="insta:image" content="/iskender_main.svg" />

        <link rel="canonical" href="https://iskender.kg" />
        <link rel="icon" type="image/svg+xml" href="/iskender_main.svg" />
      </Head>

      <Layout>
        <Header />
        <Counter />
        <CompanyGoal />
        <DiscountProductCard />
        <SwitchSection />
        <Catalog />
        <Reviews />
        <Brands />
      </Layout>
    </>
  );
}
