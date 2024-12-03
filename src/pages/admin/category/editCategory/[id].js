import styles from "./editCategory.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchCategoriesById, updateCategory} from "@/store/slices/categories/categoriesSlice";
import {useRouter} from "next/router";
import Link from "next/link";
import AdminLayout from "@/pages/admin/layout";

const EditCategory = () => {
    const router = useRouter();
    const {id} = router.query;
    const dispatch = useDispatch();

    const {category, status, error} = useSelector((state) => state.categories);

    const [data, setData] = useState({
        ru: "",
        en: "",
        kgz: "",
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchCategoriesById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (category) {
            setData({
                ru: category.find((lang) => lang.language_code === "ru")?.name || "",
                en: category.find((lang) => lang.language_code === "en")?.name || "",
                kgz: category.find((lang) => lang.language_code === "kgz")?.name || "",
            });
        }
    }, [category]);

    const handleInputChange = (event, language) => {
        setData((prevData) => ({
            ...prevData,
            [language]: event.target.value,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!data.ru.trim() || !data.en.trim() || !data.kgz.trim()) {
            alert("Заполните все поля!");
            return;
        }

        const categoryData = [
            {language_code: "ru", name: data.ru.trim()},
            {language_code: "en", name: data.en.trim()},
            {language_code: "kgz", name: data.kgz.trim()},
        ];

        dispatch(updateCategory({id, categoryData}))
            .unwrap()
            .then(() => {
                alert("Категория успешно обновлена!");
                router.push("/admin/category");
            })
            .catch((err) => {
                alert(`Ошибка обновления категории: ${err}`);
            });
    };

    return (
        <AdminLayout>
            <div className={styles.EditCategory}>
                <section>
                    <h3>Изменить категорию</h3>
                </section>
                {status === "loading" ? (
                    <p>Загрузка данных...</p>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            <h5>Название категории (Русский)</h5>
                            <input
                                type="text"
                                placeholder="Введите название на русском"
                                value={data.ru}
                                onChange={(event) => handleInputChange(event, "ru")}
                                disabled={status === "loading"}
                            />
                        </label>
                        <label>
                            <h5>Название категории (English)</h5>
                            <input
                                type="text"
                                placeholder="Enter category name in English"
                                value={data.en}
                                onChange={(event) => handleInputChange(event, "en")}
                                disabled={status === "loading"}
                            />
                        </label>
                        <label>
                            <h5>Название категории (Кыргызча)</h5>
                            <input
                                type="text"
                                placeholder="Категорияны кыргызча жазыңыз"
                                value={data.kgz}
                                onChange={(event) => handleInputChange(event, "kgz")}
                                disabled={status === "loading"}
                            />
                        </label>
                        <button type="submit" disabled={status === "loading"}>
                            {status === "loading" ? "Сохраняем..." : "Сохранить"}
                        </button>
                        <Link href="/admin/category">
                            Отмена
                        </Link>
                        {error && <p className={styles.error}>Ошибка: {error}</p>}
                    </form>
                )}
            </div>

        </AdminLayout>
    );
};

export default EditCategory;
