import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import styles from "./allProducts.module.scss";
import {fetchAllProducts, deleteProductById} from "@/store/slices/products/productsSlice";
import AdminLayout from "@/pages/admin/layout";
import {setPage} from "@/store/slices/pagination/pagination";
import React from 'react';
const AllProducts = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.products.data);
    const {currentPage, itemsPerPage2} = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProductById(id))
            .unwrap()
            .then(() => {
                alert("Продукт успешно удалён!");
            })
            .catch((error) => {
                console.error("Ошибка при удалении продукта:", error);
                alert(error || "Не удалось удалить продукт.");
            });
    };

    const startIndex = (currentPage - 1) * itemsPerPage2;
    const endIndex = startIndex + itemsPerPage2;

    const totalPages = Math.ceil((items?.length || 0) / itemsPerPage2);
    const currentItems = items?.slice(startIndex, endIndex) || [];

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    };

    return (
        <AdminLayout>
            <main className={styles.main}>
                <div className={styles.AllProducts}>
                    <section className={styles.search}>
                        <button className={styles.add_btn}>
                            <Link href="/admin/products/addProducts">
                                Добавить новый продукт
                            </Link>
                        </button>
                    </section>

                    <div className={styles.tableContainer}>
                        <table className={styles.customTable}>
                            <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Описание</th>
                                <th>Цена</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((item) => {
                                const russianItem = item.items?.find(
                                    (subItem) => subItem.language_code === "ru"
                                );

                                return (
                                    <tr key={item.ID}>
                                        <td className={styles.title}>{item.name}</td>
                                        <td>{russianItem?.description || "Описание отсутствует"}</td>
                                        <td>{item.price}</td>
                                        <td className={styles.actions}>
                                           <button className={styles.actionButton}>
                                               <Link href={`/admin/products/UpdateProducts/${item.ID}`}>
                                                   edit
                                               </Link>
                                           </button>
                                            <button
                                                className={styles.actionButton}
                                                onClick={() => handleDelete(item.ID)}
                                            >
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                    {items && items.length > 0 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ←
                            </button>
                            {Array.from({length: totalPages}, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? styles.active : ""}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </AdminLayout>
    );
};

export default AllProducts;
