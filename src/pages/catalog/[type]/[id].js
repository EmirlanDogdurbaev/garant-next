"use client";

import React, {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useRef,
} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import Layout from "@/components/Layout/Layout";
import CardSlider from "@/components/UI/CardSlider/CardSlider";
import placeholderImage from "../../../../public/img.png";
import styles from "./ProductDetailPage.module.scss";
import Head from "next/head";
import {
    fetchProductById,
    fetchCollectionById,
    fetchProductInCollection,
    fetchRecommendationCollection,
    setSelectedProduct,
} from "@/store/slices/products/productsSlice";

const ProductDetailPage = ({initialData, initialLanguage}) => {
    const {t} = useTranslation();
    const router = useRouter();
    const {id, type} = router.query;

    const dispatch = useDispatch();
    const language =
        useSelector((state) => state.language.selectedLanguage) || initialLanguage;
    const product = useSelector((state) => state.products.selectedProduct);
    const collection = useSelector(
        (state) => state.products.productsInCollection
    );
    const rec = useSelector((state) => state.products.recommendationCollections);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const previousCollectionId = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);

    console.log(product)

    useEffect(() => {
        if (!router.isReady) return;

        if (initialData) {
            console.log(initialData)
            dispatch(setSelectedProduct(initialData));
        } else if (type === "product" && id && product?.id !== id) {
            dispatch(fetchProductById(id));
        } else if (type === "collection" && id) {
            console.log(id)
            dispatch(fetchCollectionById(id));
        }
    }, [router.isReady, type, id, initialData, dispatch, product?.id]);


    useEffect(() => {
        if (
            product?.collection_id &&
            product.collection_id !== previousCollectionId.current
        ) {
            previousCollectionId.current = product.collection_id;
            dispatch(
                fetchProductInCollection({
                    collectionId: product.collection_id,
                })
            );
        }
    }, [product?.collection_id, dispatch,]);

    useEffect(() => {
        dispatch(fetchRecommendationCollection(language));
    }, [dispatch, language]);

    const filteredThumbnails = useMemo(() => {
        if (selectedColor && product?.photos) {
            return product.photos
                .filter((photo) => photo.hashColor === selectedColor)
                .map((photo) => photo.url);
        }
        if (product?.photos) {
            return product.photos.map((photo) => photo.url);
        }
        return [placeholderImage];
    }, [selectedColor, product]);

    const mainImage =
        filteredThumbnails.length > 0
            ? filteredThumbnails[currentIndex % filteredThumbnails.length]
            : placeholderImage;

    const handleNextImage = useCallback(() => {
        if (filteredThumbnails.length > 0) {
            setCurrentIndex((currentIndex + 1) % filteredThumbnails.length);
        }
    }, [currentIndex, filteredThumbnails.length]);

    const handlePrevImage = useCallback(() => {
        if (filteredThumbnails.length > 0) {
            setCurrentIndex(
                (currentIndex - 1 + filteredThumbnails.length) %
                filteredThumbnails.length
            );
        }
    }, [currentIndex, filteredThumbnails.length]);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setCurrentIndex(0);
    };

    if (loading || !router.isReady) {
        return <div className={styles.loading}>{t("loading")}</div>;
    }
    if (!product || Object.keys(product).length === 0) {
        return <div className={styles.notFound}>{t("product_not_found")}</div>;
    }

    return (
        <>
            <Head>
                <title>{product?.name || "Продукт"} | Название вашего магазина</title>
                <meta
                    name="description"
                    content={product?.description || "Описание продукта"}
                />
                <meta
                    name="keywords"
                    content={product?.tags?.join(", ") || "Продукт, Магазин, Покупка"}
                />
                <meta property="og:title" content={product?.name || "Продукт"}/>
                <meta
                    property="og:description"
                    content={product?.description || "Описание продукта"}
                />
                <meta property="og:image" content={mainImage}/>
                <meta
                    property="og:url"
                    content={`https://yourdomain.com/catalog/product/${id}`}
                />
                <meta property="og:type" content="product"/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={product?.name || "Продукт"}/>
                <meta
                    name="twitter:description"
                    content={product?.description || "Описание продукта"}
                />
                <meta name="twitter:image" content={mainImage}/>
                <link
                    rel="canonical"
                    href={`https://yourdomain.com/catalog/product/${id}`}/>
                <link rel="icon" type="image/svg+xml" href="/logo_black.svg"/>

            </Head>

            <Layout>
                <div className={styles.ProductDetail}>
                    <div className={styles.back_link}>
                        <a onClick={() => router.push(`/catalog`)} className={styles.linkk}>
                            {t("category")} / <span>{product?.name || collection?.name}</span>
                        </a>
                    </div>

                    <section className={styles.cont}>
                        <div className={styles.imageSection}>
                            <aside className={styles.box}>
                                <img
                                    src={mainImage}
                                    alt={product?.name}
                                    className={styles.mainImage}
                                />
                                <span>
                  <button
                      className={styles.arrowButton}
                      onClick={handlePrevImage}
                      disabled={filteredThumbnails.length === 0}
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="21"
                        viewBox="0 0 19 21"
                        fill="none"
                    >
                      <g clipPath="url(#clip0_1082_3578)">
                        <path
                            d="M11.8033 16.8361L6.03956 10.9798C5.91315 10.852 5.84224 10.6796 5.84224 10.4998C5.84224 10.3201 5.91315 10.1476 6.03956 10.0198L11.8021 4.16356C11.9284 4.03499 11.9992 3.86195 11.9992 3.68169C11.9992 3.50143 11.9284 3.32838 11.8021 3.19981C11.7403 3.1365 11.6666 3.08619 11.5851 3.05183C11.5036 3.01748 11.4161 2.99978 11.3277 2.99978C11.2393 2.99978 11.1517 3.01748 11.0703 3.05183C10.9888 3.08619 10.915 3.1365 10.8533 3.19981L5.09081 9.05481C4.71215 9.44046 4.5 9.95934 4.5 10.4998C4.5 11.0403 4.71215 11.5592 5.09081 11.9448L10.8533 17.7998C10.915 17.8633 10.9889 17.9138 11.0705 17.9483C11.1521 17.9827 11.2397 18.0005 11.3283 18.0005C11.4169 18.0005 11.5045 17.9827 11.5861 17.9483C11.6677 17.9138 11.7416 17.8633 11.8033 17.7998C11.9297 17.6712 12.0004 17.4982 12.0004 17.3179C12.0004 17.1377 11.9297 16.9646 11.8033 16.8361Z"
                            fill="#212529"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1082_3578">
                          <rect
                              width="20"
                              height="17.5"
                              fill="white"
                              transform="matrix(0 -1 1 0 0.75 20.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <button
                      className={styles.arrowButton}
                      onClick={handleNextImage}
                      disabled={filteredThumbnails.length === 0}
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="21"
                        viewBox="0 0 19 21"
                        fill="none"
                    >
                      <g clipPath="url(#clip0_1082_5282)">
                        <path
                            d="M7.19669 4.16394L12.9604 10.0202C13.0869 10.148 13.1578 10.3204 13.1578 10.5002C13.1578 10.6799 13.0869 10.8524 12.9604 10.9802L7.19794 16.8364C7.0716 16.965 7.0008 17.1381 7.0008 17.3183C7.0008 17.4986 7.0716 17.6716 7.19794 17.8002C7.25966 17.8635 7.33343 17.9138 7.41491 17.9482C7.49638 17.9825 7.5839 18.0002 7.67232 18.0002C7.76074 18.0002 7.84826 17.9825 7.92973 17.9482C8.0112 17.9138 8.08497 17.8635 8.14669 17.8002L13.9092 11.9452C14.2879 11.5595 14.5 11.0407 14.5 10.5002C14.5 9.95972 14.2879 9.44084 13.9092 9.05519L8.14669 3.20019C8.08495 3.13669 8.01111 3.08621 7.92952 3.05174C7.84793 3.01727 7.76026 2.99951 7.67169 2.99951C7.58312 2.99951 7.49546 3.01727 7.41387 3.05174C7.33228 3.08621 7.25843 3.13669 7.19669 3.20019C7.07035 3.32876 6.99955 3.5018 6.99955 3.68206C6.99955 3.86232 7.07035 4.03537 7.19669 4.16394Z"
                            fill="#212529"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1082_5282">
                          <rect
                              width="20"
                              height="17.5"
                              fill="white"
                              transform="matrix(0 1 -1 0 18.25 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </span>
                            </aside>
                            {filteredThumbnails.length > 0 ? (
                                <div className={styles.thumbnailContainer}>
                                    {filteredThumbnails.map((thumbnail, index) => (
                                        <img
                                            key={index}
                                            src={thumbnail}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={styles.thumbnail}
                                            onClick={() => setCurrentIndex(index)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        <div className={styles.infoSection}>
                            <h2 className={styles.title}>{product?.name}</h2>
                            <ul className="color-list">
                                {Array.isArray(product.colors) &&
                                    product.colors
                                        .filter((color, index, self) =>
                                            index === self.findIndex(c => c.hash_color === color.hash_color)
                                        )
                                        .map((color, index) => (
                                            <li
                                                key={index}
                                                style={{ backgroundColor: color.hash_color }}
                                                className={`color-item ${selectedColor === color.hash_color ? "active" : ""}`}
                                                onClick={() => handleColorSelect(color.hash_color)}
                                            ></li>
                                        ))
                                }

                            </ul>

                            <p className={styles.price}>
                                {product.new_price !== 0 ? <>{product.new_price} {t("vacancies.currency")}</> :
                                product.price !== 0 ? <>{product.price}</>:
                                    " "
                                }
                            </p>


                            <div className={styles.description}>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.cont2}>
                        <h3>{t("detail_page.block1")}</h3>
                        <CardSlider cards={collection || []}/>
                    </section>

                    <section className={styles.cont2}>
                        <h3>{t("detail_page.block2")}</h3>
                        <CardSlider cards={rec || []}/>
                    </section>
                </div>
            </Layout>
        </>
    );
};

export default ProductDetailPage;
