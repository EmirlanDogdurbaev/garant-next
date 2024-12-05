"use client";

import React, {useEffect, useState, useMemo, useCallback, useRef} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import Layout from "@/components/Layout/Layout";
import CardSlider from "@/components/UI/CardSlider/CardSlider";
import placeholderImage from "../../../../public/img.png";
import styles from "./ProductDetailPage.module.scss";

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
    const language = useSelector((state) => state.language.selectedLanguage) || initialLanguage;
    const product = useSelector((state) => state.products.selectedProduct);
    const collection = useSelector((state) => state.products.productsInCollection);
    const rec = useSelector((state) => state.products.recommendationCollections);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const previousCollectionId = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        if (initialData) {
            dispatch(setSelectedProduct(initialData));
        } else if (type === "product" && id && product?.id !== id) {
            dispatch(fetchProductById(id));
        } else if (type === "collection" && id) {
            dispatch(fetchCollectionById(id));
        }
    }, [router.isReady, type, id, initialData, dispatch, product?.id]);

    useEffect(() => {
        if (product?.collection_id && product.collection_id !== previousCollectionId.current) {
            previousCollectionId.current = product.collection_id;
            dispatch(fetchProductInCollection({collectionId: product.collection_id, language}));
        }
    }, [product?.collection_id, dispatch, language]);

    useEffect(() => {
        dispatch(fetchRecommendationCollection(language));
    }, [dispatch, language]);

    // Получение уникальных цветов
    const uniqueColors = useMemo(() => {
        if (product?.photos) {
            return [...new Set(product.photos.map((photo) => photo.hashColor))];
        }
        return [];
    }, [product]);


    console.log(product)
    // Фильтрация изображений по цвету
    const filteredThumbnails = useMemo(() => {
        if (selectedColor && product?.photos) {
            return product.photos
                .filter((photo) => photo.hash_color === selectedColor)
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
            setCurrentIndex((currentIndex - 1 + filteredThumbnails.length) % filteredThumbnails.length);
        }
    }, [currentIndex, filteredThumbnails.length]);

    if (loading || !router.isReady) {
        return <div className={styles.loading}>{t("loading")}</div>;
    }
    if (!product || Object.keys(product).length === 0) {
        return <div className={styles.notFound}>{t("product_not_found")}</div>;
    }

    return (
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
                            <img src={mainImage} alt={product?.name} className={styles.mainImage}/>
                            <span>
                                <button
                                    className={styles.arrowButton}
                                    onClick={handlePrevImage}
                                    disabled={filteredThumbnails.length === 0}
                                >
                                    ⬅
                                </button>
                                <button
                                    className={styles.arrowButton}
                                    onClick={handleNextImage}
                                    disabled={filteredThumbnails.length === 0}
                                >
                                    ➡
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
                        <p className={styles.price}>
                            {product?.price} {t("currency")}
                        </p>
                        <div className={styles.description}>
                            <h3>{t("description")}</h3>
                            <p>{product?.description}</p>
                        </div>
                    </div>
                </section>

                {collection.length > 0 ? <section className={styles.cont2}>
                    <h3>{t("detail_page.block1")}</h3>
                    <CardSlider cards={collection || []}/>
                </section> : ("")}


                <section className={styles.cont2}>
                    <h3>{t("detail_page.block2")}</h3>
                    <CardSlider cards={rec || []}/>
                </section>
            </div>
        </Layout>
    );
};

export default ProductDetailPage;
