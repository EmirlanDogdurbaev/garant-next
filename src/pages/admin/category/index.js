import { useDispatch, useSelector } from "react-redux";
import styles from "./category.module.scss";
import { useEffect } from "react";
import { deleteCategory, fetchCategories } from "@/store/slices/categories/categoriesSlice";
import Link from "next/link";

const AllCategory = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCategory(id))
            .unwrap()
            .then(() => {
                alert("Категория успешно удалена");
            })
            .catch((error) => {
                console.error("Ошибка при удалении категории:", error);
                alert(error.message || "Не удалось удалить категорию.");
            });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Категории</h1>
                <Link href="/admin/category/addCategory">
                    + Добавить новую категорию
                </Link>
            </header>

            {categories.length > 0 ? (
                <div className={styles.grid}>
                    {categories.map((category) => (
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
                <p>Список категорий пуст.</p>
            )}
        </div>
    );
};

export default AllCategory;
