import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteBrand, fetchBrands} from "@/store/slices/brands/brandsSlice";
import AdminLayout from "@/pages/admin/layout";
import styles from "@/pages/admin/category/category.module.scss";
import Link from "next/link";
import React from 'react';
export default function allBrands() {
    const dispatch = useDispatch()

    const brands = useSelector((state) => state.brands.brands)

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])
    console.log(brands)

    const handleDelete = (id) => {
        dispatch(deleteBrand(id))
            .unwrap()
            .then(() => {
                alert("карточка клиента успешно удалена");
            })
            .catch((error) => {
                console.error("Ошибка при удалении карточки клиента:", error);
                alert(error.message || "Не удалось удалить карточку клиента.");
            });
    };
    return (
        <AdminLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Клиенты</h1>
                    <Link href="/admin/brands/addBrands">
                        + Добавить новую карточку клиента
                    </Link>
                </header>

                {brands.length > 0 ? (
                    <div className={styles.grid}>
                        {brands.map((category) => (
                            <div key={category.id} className={styles.card}>
                                <p>{category.name}</p>
                                <div className={styles.actions}>
                                    <Link href={`/admin/category/editCategory/${category.id}`}>
                                        <span>✏️</span>
                                    </Link>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <span>🗑️</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                  <div>
                      <p>
                          axa
                      </p>
                  </div>
                )}
            </div>
        </AdminLayout>
    )
}