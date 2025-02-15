import styles from "./CardItem.module.scss";
import Link from "next/link";
import React from 'react';
import {useTranslation} from "react-i18next";

const CardItem = ({items}) => {
    const url = items?.photo?.[0]?.url;
    const {t} = useTranslation();
    console.log(items)

    return (
        <div className={styles.CardItem}>

            <img src={url} alt={items.name || "Product Image"} height={300} width={350}/>

            <div className={styles.card_content}>
                <article>
                    <div className={styles.top_content}>
                        {items.is_producer === true && (
                            <span className={styles.iskender}>Garant</span>
                        )}

                        <Link
                            href={`/catalog/${items.collection_id != null ? "product" : "collection"}/${items.id}`}
                            className={styles.link}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                            >
                                <path
                                    d="M16.7917 2.4375C16.7917 2.22201 16.8773 2.01535 17.0296 1.86298C17.182 1.7106 17.3887 1.625 17.6042 1.625H23.5625C23.778 1.625 23.9847 1.7106 24.137 1.86298C24.2894 2.01535 24.375 2.22201 24.375 2.4375V8.39583C24.375 8.61132 24.2894 8.81798 24.137 8.97036C23.9847 9.12273 23.778 9.20833 23.5625 9.20833C23.347 9.20833 23.1404 9.12273 22.988 8.97036C22.8356 8.81798 22.75 8.61132 22.75 8.39583V4.39833L16.0117 11.1367C15.9373 11.2165 15.8476 11.2805 15.7479 11.3249C15.6483 11.3693 15.5407 11.3932 15.4316 11.3951C15.3225 11.3971 15.2141 11.377 15.1129 11.3361C15.0118 11.2953 14.9199 11.2344 14.8427 11.1573C14.7656 11.0801 14.7047 10.9882 14.6639 10.8871C14.623 10.7859 14.6029 10.6775 14.6049 10.5684C14.6068 10.4593 14.6307 10.3517 14.6751 10.2521C14.7195 10.1524 14.7835 10.0627 14.8633 9.98833L21.6017 3.25H17.6042C17.3887 3.25 17.182 3.1644 17.0296 3.01202C16.8773 2.85965 16.7917 2.65299 16.7917 2.4375Z"
                                    fill="#212529"
                                    fillOpacity="0.8"
                                />
                                <path
                                    d="M2.70825 4.60409C2.70825 3.55759 3.55759 2.70825 4.60409 2.70825H13.8124C14.0279 2.70825 14.2346 2.79385 14.3869 2.94623C14.5393 3.0986 14.6249 3.30526 14.6249 3.52075C14.6249 3.73624 14.5393 3.9429 14.3869 4.09528C14.2346 4.24765 14.0279 4.33325 13.8124 4.33325H4.60409C4.53226 4.33325 4.46337 4.36179 4.41258 4.41258C4.36179 4.46337 4.33325 4.53226 4.33325 4.60409V21.3958C4.33325 21.5452 4.45459 21.6666 4.60409 21.6666H21.3958C21.4676 21.6666 21.5365 21.6381 21.5873 21.5873C21.6381 21.5365 21.6666 21.4676 21.6666 21.3958V12.1874C21.6666 11.9719 21.7522 11.7653 21.9046 11.6129C22.0569 11.4605 22.2636 11.3749 22.4791 11.3749C22.6946 11.3749 22.9012 11.4605 23.0536 11.6129C23.206 11.7653 23.2916 11.9719 23.2916 12.1874V21.3958C23.2916 21.8986 23.0918 22.3808 22.7363 22.7363C22.3808 23.0918 21.8986 23.2916 21.3958 23.2916H4.60409C4.10128 23.2916 3.61907 23.0918 3.26353 22.7363C2.90799 22.3808 2.70825 21.8986 2.70825 21.3958V4.60409Z"
                                    fill="#212529"
                                    fillOpacity="0.8"
                                />
                            </svg>
                        </Link>
                    </div>
                    <h4>{items.name || "Product Name"}</h4>
                </article>
                <span className={styles.price}>
          <h4>
       {items.new_price !== 0 ? <>{items.new_price} {t("vacancies.currency")}</> :
           items.price !== 0 ? <>{items.price} {t("vacancies.currency")}</> :
               " "
       }
          </h4>
          <h4 className={styles.old}>
       {items.old_price !== 0 ? <>{items.old_price}  {t("vacancies.currency")}</> :
           items.old_price !== 0 ? <>{items.old_price}  {t("vacancies.currency")}</> :
               " "
       }
          </h4>
        </span>
            </div>
        </div>
    );
};

export default CardItem;
