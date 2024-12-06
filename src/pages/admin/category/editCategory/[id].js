import styles from "./editCategory.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategoriesById, updateCategory } from "@/store/slices/categories/categoriesSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminLayout from "@/pages/admin/layout";
import React from "react";

const EditCategory = () => {
    const router = useRouter();
    const { id } = router.query; // Получаем ID из URL
    const dispatch = useDispatch();

    // Данные категории из Redux
    const category = useSelector((state) => state.categories.categories); // Здесь должен быть объект с массивом categories
    const { status, error } = useSelector((state) => state.categories);

    // Локальное состояние для хранения данных
    const [data, setData] = useState({
        ru: "",
        en: "",
        kgz: "",
    });

    // Загружаем данные категории по ID
    useEffect(() => {
        if (id) {
            dispatch(fetchCategoriesById(id));
        }
    }, [dispatch, id]);

    // Устанавливаем данные в локальное состояние после загрузки
    useEffect(() => {
        if (category?.categories) {
            setData({
                ru: category.categories.find((cat) => cat.language_code === "ru")?.name || "",
                en: category.categories.find((cat) => cat.language_code === "en")?.name || "",
                kgz: category.categories.find((cat) => cat.language_code === "kgz")?.name || "",
            });
        }
    }, [category]);

    // Обработка изменений в полях ввода
    const handleInputChange = (event, language) => {
        setData((prevData) => ({
            ...prevData,
            [language]: event.target.value,
        }));
    };

    // Обработка отправки формы
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Проверка на заполненность всех полей
        if (!data.ru.trim() || !data.en.trim() || !data.kgz.trim()) {
            alert("Заполните все поля!");
            return;
        }

        // Формируем данные для отправки
        const categoryData = [
            { language_code: "ru", name: data.ru.trim() },
            { language_code: "en", name: data.en.trim() },
            { language_code: "kgz", name: data.kgz.trim() },
        ];

        // Отправляем данные
        dispatch(updateCategory({ id, categoryData }))
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
                        {/* Поле для ввода на русском */}
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

                        {/* Поле для ввода на английском */}
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

                        {/* Поле для ввода на кыргызском */}
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

                        {/* Кнопка сохранения */}
                        <button type="submit" disabled={status === "loading"}>
                            {status === "loading" ? "Сохраняем..." : "Сохранить"}
                        </button>

                        {/* Ссылка для отмены */}
                        <Link href="/admin/category">Отмена</Link>

                        {/* Сообщение об ошибке */}
                        {error && <p className={styles.error}>Ошибка: {error}</p>}
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default EditCategory;
