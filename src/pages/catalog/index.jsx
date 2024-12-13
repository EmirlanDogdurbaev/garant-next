import React from 'react';
import Layout from "@/components/Layout/Layout";
import ModalFilter from "@/components/UI/ModalFilter/ModalFilter";
import Link from "next/link";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import SearchBar from "@/components/SearchBar/SearchBar";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "@/store/slices/categories/categoriesSlice";
import {useEffect, useState} from "react";
import styles from "../../styles/CatalogPage.module.scss"
import Head from "next/head";
import {fetchPopularProducts} from "@/store/slices/products/productsSlice";


export default function CatalogPage() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const results = useSelector((state) => state.search.results);
    const categories = useSelector((state) => state.categories.categories);
    const categoriesLoading = useSelector((state) => state.categories.loading);
    const categoriesError = useSelector((state) => state.categories.error);
    const selectedCategory = useSelector((state) => state.search.filters.category);
    const [isModalOpen, setModalOpen] = useState(false);
    const language = useSelector((state) => state.language.selectedLanguage);
    const inputValue = useSelector((state) => state.search.filters.inputValue);
    const {error, loading} = useSelector((state) => state.search)
    const product = useSelector((state) => state.products.popularProducts)


    console.log(results)
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchPopularProducts())
    }, [dispatch, language]);


    return (

        <>
            <Head>
                <title>Каталог товаров | Ваш проект</title>
                <meta name="description" content="Описание страницы каталога товаров для поисковых систем."/>
                <meta name="keywords" content="каталог, товары, цены, купить, название вашего проекта"/>
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content="Каталог товаров | Garant Premium"/>
                <meta property="og:description" content="Описание страницы каталога для социальных сетей."/>
                <meta property="og:image" content="/path-to-image.jpg"/>
                <meta property="og:url" content="https://garant-asia.com/catalog"/>
                <link rel="canonical" href="https://garant-asia.com/catalog"/>
                <link rel="icon" type="image/svg+xml" href="/logo_black.svg"/>
            </Head>
            <Layout>
                <div className={styles.CatalogPage}>
                    <section className={styles.searchbar}>
                        <div className={styles.top}>
                            <SearchBar/>
                            <button className={styles.filter}
                                    onClick={() => setModalOpen(true)}>{t("catalog_page.filter")}</button>
                        </div>
                        <div>
                            {categoriesLoading ? (<p>Loading categories...</p>) : categoriesError ? (
                                <p>Error loading categories: {categoriesError}</p>) : (
                                <CategorySlider categories={categories}/>)}
                        </div>
                    </section>

                    <section className={styles.results_container}>
                        {error ? (
                            <div className={styles.noResults}>Товары не найдены </div>
                        ) : Array.isArray(results) && results.length > 0 ? (
                            <div className={styles.card_cont}>
                                {results.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/catalog/${item.collection_id ? "product" : "collection"}/${item.id}`}
                                        className={styles.card}
                                    >
                                        {item.isProducer && <span className={styles.brand}>Garant</span>}
                                        <div>
                                            <img
                                                src={item.photos?.[0]?.url || "/default-image.jpg"}
                                                alt={item.name || "Изображение товара"}
                                            />
                                            <aside>
                                                <h4>{item.name || "Без названия"}</h4>
                                                <div className={styles.line}/>
                                                <p className={styles.price}>
                                                    {item.new_price !== 0 ? <>{item.new_price}</> :
                                                        item.price !== 0 ? <>{item.price} сом</> :
                                                            "Цена не указано"
                                                    }

                                                </p>
                                            </aside>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div>
                                {Array.isArray(product) && product.length > 0 ? (
                                    <div className={styles.card_cont}>
                                        {product.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/catalog/${item.collection_id ? "product" : "collection"}/${item.id}`}
                                                className={styles.card}
                                            >
                                                {item.isProducer && <span className={styles.brand}>Garant</span>}
                                                <div>
                                                    <img
                                                        src={item.photos?.[0]?.url || "/default-image.jpg"}
                                                        alt={item.name || "Изображение товара"}
                                                    />
                                                    <aside>
                                                        <h4>{item.name || "Без названия"}</h4>
                                                        <div className={styles.line}/>
                                                        <p className={styles.price}>
                                                            {item.new_price !== 0 ? <>{item.new_price}</> :
                                                                item.price !== 0 ? <>{item.price} сом</> :
                                                                    "Цена не указано"
                                                            }
                                                        </p>
                                                    </aside>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={styles.noProducts}>{t("noResults")}</p>
                                )}
                            </div>
                        )}
                        {isModalOpen && <ModalFilter onClose={() => setModalOpen(false)}/>}
                    </section>
                </div>
            </Layout>
        </>

    )
}
;
