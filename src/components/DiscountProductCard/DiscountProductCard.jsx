import styles from "./DiscountProductCard.module.scss";
import CardItem from "./CardItem/CardItem.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {fetchDiscountProducts} from "@/store/slices/products/productsSlice";

const DiscountProductCard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const items = useSelector((state) => state.products.discount)

    useEffect(() => {
        dispatch(fetchDiscountProducts());
    }, [dispatch]);


    return (
        <section className={styles.DiscountProductCard}>
            <div className={styles.title}>
                <h2>{t("special_offer.title")}</h2>
            </div>

            <div className={styles.slider_container}>
        <span className={styles.btn_cont}>
          <button className={styles.arrow_left}>
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
          <button className={styles.arrow_right}>
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

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: `.${styles.arrow_right}`,
                        prevEl: `.${styles.arrow_left}`,
                    }}
                    spaceBetween={30}
                    slidesPerView={"auto"}
                    className={styles.slides}
                    breakpoints={{
                        1440: {
                            slidesPerView: 2,
                        },
                        1280: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 1,
                        },
                        800: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                        600: {
                            slidesPerView: 1,
                        },
                    }}
                >
                    {Array.isArray(items) && items.map((product, index) => (
                        <SwiperSlide key={index} className={styles.slide} style={{"diaplay": "flex"}}>
                            <CardItem items={product}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default DiscountProductCard;
