import React from "react";
import Layout from "@/components/Layout/Layout";
import ModalFilter from "@/components/UI/ModalFilter/ModalFilter";
import Link from "next/link";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/categories/categoriesSlice";
import { useEffect, useState } from "react";
import styles from "../../styles/CatalogPage.module.scss";
import Head from "next/head";
import { fetchPopularProducts } from "@/store/slices/products/productsSlice";
import Image from "next/image";

export default function CatalogPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);
  const categories = useSelector((state) => state.categories.categories);
  const categoriesLoading = useSelector((state) => state.categories.loading);
  const categoriesError = useSelector((state) => state.categories.error);
  const selectedCategory = useSelector(
    (state) => state.search.filters.category
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const language = useSelector((state) => state.language.selectedLanguage);
  const inputValue = useSelector((state) => state.search.filters.inputValue);
  const { error, loading } = useSelector((state) => state.search);
  const product = useSelector((state) => state.products.popularProducts);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPopularProducts());
  }, [dispatch, language]);

  return (
    <>
      <Head>
        <title>Каталог товаров | Iskender Group</title>
        <meta
          name="description"
          content="Каталог товаров от Iskender Group – широкий выбор качественных товаров по доступным ценам. Откройте для себя лучшее!"
        />
        <meta
          name="keywords"
          content="каталог, товары, купить, цены, Iskender Group, продукция, онлайн-магазин, качественные товары"
        />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Каталог товаров | Iskender Group" />
        <meta
          property="og:description"
          content="Широкий выбор качественных товаров по доступным ценам в Iskender Group. Заходите и выбирайте!"
        />
        <meta property="og:image" content="/iskender_main.svg" />
        <meta property="og:url" content="https://iskender.kg/catalog" />
        <meta property="og:type" content="website" />

        <link rel="canonical" href="https://iskender.kg/catalog" />

        <link rel="icon" type="image/svg+xml" href="/iskender_main.svg" />
      </Head>

      <Layout>
        <div className={styles.CatalogPage}>
          <section className={styles.searchbar}>
            <div className={styles.top}>
              <SearchBar />
              <button
                className={styles.filter}
                onClick={() => setModalOpen(true)}
              >
                {t("catalog_page.filter")}
              </button>
            </div>
            <div>
              {categoriesLoading ? (
                <p>Loading categories...</p>
              ) : categoriesError ? (
                <p>Error loading categories: {categoriesError}</p>
              ) : (
                <CategorySlider categories={categories} />
              )}
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
                    href={`/catalog/${
                      item.collection_id != null ? "product" : "collection"
                    }/${item.id}`}
                    className={styles.card}
                  >
                    {item.isProducer ? (
                      <span className={styles.brand}>Iskender</span>
                    ) : (
                      ""
                    )}
                    {item.isGarant ? (
                      <span className={styles.brand}>Garant</span>
                    ) : (
                      ""
                    )}
                    {item.isAqua ? (
                      <span className={styles.brand}>Aqualux</span>
                    ) : (
                      ""
                    )}
                    <div>
                      <Image
                        src={item.photos?.[0]?.url || "/default-image.jpg"}
                        alt={item.name || "Default Name"}
                        priority
                        width={100}
                        height={100}
                      />
                      <aside>
                        <h4>{item.name || "Без названия"}</h4>
                        <div className={styles.line} />
                        <p className={styles.price}>
                          {item.new_price !== 0 ? (
                            <>
                              {item.new_price} {t("vacancies.currency")}
                            </>
                          ) : item.price !== 0 ? (
                            <>
                              {item.price} {t("vacancies.currency")}
                            </>
                          ) : (
                            " "
                          )}
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
                        href={`/catalog/${
                          item.collection_id != null ? "product" : "collection"
                        }/${item.id}`}
                        className={styles.card}
                      >
                        {item.isProducer ? (
                          <span className={styles.brand}>Iskender</span>
                        ) : (
                          ""
                        )}
                        {item.isGarant ? (
                          <span className={styles.brand}>Garant</span>
                        ) : (
                          ""
                        )}
                        {item.isAqua ? (
                          <span className={styles.brand}>Aqualux</span>
                        ) : (
                          ""
                        )}
                        <div>
                          <Image
                            src={item.photos?.[0]?.url || "/default-image.jpg"}
                            alt={item.name || "Default Name"}
                            width={100}
                            height={100}
                            priority
                          />
                          <aside>
                            <h4>{item.name || "Без названия"}</h4>
                            <div className={styles.line} />
                            <p className={styles.price}>
                              {item.new_price !== 0 ? (
                                <>
                                  {item.new_price} {t("vacancies.currency")}
                                </>
                              ) : item.price !== 0 ? (
                                <>
                                  {item.price} {t("vacancies.currency")}
                                </>
                              ) : (
                                " "
                              )}
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
            {isModalOpen && <ModalFilter onClose={() => setModalOpen(false)} />}
          </section>
        </div>
      </Layout>
    </>
  );
}
