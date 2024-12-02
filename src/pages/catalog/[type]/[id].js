"use client";

import {useEffect, useState, useMemo, useCallback, useRef} from "react";
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

    const thumbnails = useMemo(() => {
        if (product?.photos && product.photos.length > 0) {
            return product.photos.map((pic) => pic.url);
        }
        return [placeholderImage];
    }, [product]);

    const mainImage = thumbnails.length > 0 ? thumbnails[currentIndex % thumbnails.length] : placeholderImage;

    const handleNextImage = useCallback(() => {
        if (thumbnails.length > 0) {
            setCurrentIndex((currentIndex + 1) % thumbnails.length);
        }
    }, [currentIndex, thumbnails.length]);

    const handlePrevImage = useCallback(() => {
        if (thumbnails.length > 0) {
            setCurrentIndex((currentIndex - 1 + thumbnails.length) % thumbnails.length);
        }
    }, [currentIndex, thumbnails.length]);

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
                    <a onClick={() => router.push(`/catalog`)}>
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
                                    disabled={thumbnails.length === 0}
                                >
                                    ⬅
                                </button>
                                <button
                                    className={styles.arrowButton}
                                    onClick={handleNextImage}
                                    disabled={thumbnails.length === 0}
                                >
                                    ➡
                                </button>
                            </span>
                        </aside>
                        {thumbnails.length > 0 ? (
                            <div className={styles.thumbnailContainer}>
                                {thumbnails.map((thumbnail, index) => (
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
                            <p>{t("no_images")}</p>
                        )}
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.title}>{product?.name}</h2>
                        <p className={styles.price}>{product?.price} {t("currency")}</p>
                        <div className={styles.description}>
                            <h3>{t("description")}</h3>
                            <p>{product?.description}</p>
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
    );
};

export default ProductDetailPage;
