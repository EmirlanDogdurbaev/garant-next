import styles from "./Catalog.module.scss";
import img from "../../../public/img.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchByDistr,
  fetchByProducer,
} from "@/store/slices/products/productsSlice";
import Link from "next/link";
import React from "react";

const Catalog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.products.filteredProducts);
  const bottomProducts = useSelector((state) => state.products.distr);

  useEffect(() => {
    dispatch(fetchByDistr());
    dispatch(fetchByProducer());
  }, []);

  const topProductsToShow = topProducts.slice(0, 4);
  const bottomProductsToShow = bottomProducts.slice(0, 4);

  return (
    <div className={styles.catalog}>
      <section className={styles.title}>
        <h3>{t("catalog.title")}</h3>
        <Link href={"/catalog"}> {t("catalog.link")}</Link>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2>{t("catalog.subtitle1")}</h2>
          <p>{t("catalog.description1")}</p>
          <Link href={"/page"} className={styles.link}>
            {t("catalog.link")}
          </Link>
        </div>
        <div className={styles.productGrid}>
          {topProductsToShow.map((product) => (
            <Link
              href={`/catalog/${
                product.collection_id ? "product" : "collection"
              }/${product.id}`}
              key={product.id}
              className={styles.productCard}
            >
              <div className={styles.brandLabel}>Garant</div>
              {Array.isArray(product.photos) && product.photos.length > 0 ? (
                product.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo?.url || "azx"}
                    alt={product.name || "Default Name"}
                    className={styles.productImage}
                    height={200}
                  />
                ))
              ) : (
                <img
                  src="azx" // Фallback для пустого массива или отсутствия photos
                  alt="Default Image"
                  className={styles.productImage}
                  height={200}
                />
              )}
              <aside className={styles.productAside}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price}</p>
              </aside>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionContent_black}>
          <h2>{t("catalog.subtitle2")}</h2>
          <p>{t("catalog.description2")}</p>
          <Link href={"/page"} className={styles.link}>
            {t("catalog.link2")}
          </Link>
        </div>
        <div className={styles.productGrid}>
          {bottomProductsToShow.map((product) => (
            <Link
              href={`/catalog/${
                product.collection_id ? "product" : "collection"
              }/${product.id}`}
              key={product.id}
              className={styles.productCard}
            >
              {Array.isArray(product.photos) && product.photos.length > 0 ? (
                product.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo?.url || "azx"}
                    alt={product.name || "Default Name"}
                    className={styles.productImage}
                    height={200}
                  />
                ))
              ) : (
                <img
                  src="azx" // Фallback для пустого массива или отсутствия photos
                  alt="Default Image"
                  className={styles.productImage}
                  height={200}
                />
              )}

              <aside className={styles.productAside}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price}</p>
              </aside>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalog;
