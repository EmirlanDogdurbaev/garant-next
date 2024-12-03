import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from "./allProducts.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import { fetchAllProducts, deleteProductById } from "@/store/slices/products/productsSlice";

const AllProducts = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.products.data);

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

    return (
        <main className={styles.main}>
            <div className={styles.AllProducts}>
                <section className={styles.search}>
                    <SearchBar />
                    <button className={styles.filter}>Фильтры</button>
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
                                        <Link href={`/admin/products/UpdateProducts/${item.ID}`}>
                                           edit
                                        </Link>
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
            </div>
        </main>
    );
};

export default AllProducts;
