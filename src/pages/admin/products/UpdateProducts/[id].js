import styles from "./UpdateProducts.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCollections} from "@/store/slices/collections/collectionsSlice";
import {fetchCategories} from "@/store/slices/categories/categoriesSlice";
import AdminLayout from "@/pages/admin/layout";
import {API_URL} from "@/store/api/api";
import React from "react";
import {useRouter} from "next/router";

const UpdateProduct = () => {
    const router = useRouter();
    const {id} = router.query
    const dispatch = useDispatch();
    const categoriesList = useSelector((state) => state.categories.categories);
    const collectionsList = useSelector((state) => state.collections.data);
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);

    const [formState, setFormState] = useState({
        price: 0,
        isProducer: false,
        isPainted: false,
        isPopular: false,
        isNew: false,
        category_id: null,
        collection_id: null,
        items: [
            {name: "", description: "", language_code: "ru"},
            {name: "", description: "", language_code: "kgz"},
            {name: "", description: "", language_code: "en"},
        ],
    });

    useEffect(() => {
        dispatch(fetchAllCollections());
        dispatch(fetchCategories());
        fetchProductData();
    }, [dispatch]);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${API_URL}/getItemById/${id}`);
            const product = response.data;

            setFormState({
                price: product.price,
                isProducer: product.isProducer,
                isPainted: product.isPainted,
                isPopular: product.is_popular,
                isNew: product.is_new,
                category_id: product.category_id,
                collection_id: product.collection_id,
                items: product.items || [],
            });

            setPhotos(product.photos || []);
        } catch (err) {
            console.error("Ошибка при загрузке данных продукта:", err);
        }
    };

    const handleFormChange = (field, value) => {
        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCollectionChange = (index, field, value) => {
        const updatedItems = [...formState.items];
        updatedItems[index][field] = value;
        setFormState((prev) => ({
            ...prev,
            items: updatedItems,
        }));
    };

    const handleAddPhoto = () => {
        setPhotos((prevPhotos) => [
            ...prevPhotos,
            {file: null, isMain: false, hashColor: "#ffffff"},
        ]);
    };

    const handleFileChange = (index, file) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index].file = file;
        setPhotos(updatedPhotos);
    };

    const handlePhotoFieldChange = (index, field, value) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index][field] = value;
        setPhotos(updatedPhotos);
    };

    const handleRemovePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const payload = {

            price: formState.price,
            isProducer: formState.isProducer,
            isPainted: formState.isPainted,
            is_popular: formState.isPopular,
            is_new: formState.isNew,
            items: formState.items,
            collection_id: formState.collection_id, // Убедитесь, что оно есть
            category_id: formState.category_id,
            size: "M",
        };

        console.log("Payload (item):", payload); // Лог JSON-объекта перед добавлением в formData
        formData.append("item", JSON.stringify(payload));

        console.log("Photos to be uploaded:"); // Лог фотографий
        photos.forEach((photo, index) => {
            console.log(`Photo ${index}:`, photo);
            if (photo.file) {
                formData.append(`photos`, photo.file);
                formData.append(`photos[${index}][isMain]`, photo.isMain);
                formData.append(`photos[${index}][hashColor]`, photo.hashColor);
            }
        });

        try {
            console.log("Final formData being sent:"); // Лог formData
            formData.forEach((value, key) => {
                console.log(`${key}:`, value);
            });

            const response = await axios.put(`${API_URL}/items?item_id=${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response from server:", response.data); // Лог ответа от сервера
            alert("Товар успешно обновлен:", response.data);
        } catch (err) {
            console.error("Error response from server:", err.response?.data);
            setError(err.response?.data || "Ошибка при обновлении товара.");
        }
    };


    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: "1px solid black",
            borderRadius: "5px",
            outline: "none",
        }),
    };

    return (
        <AdminLayout>
            <div className={styles.AddCollection}>
                <div className={styles.inner}>
                    <section className={styles.title}>
                        <h2>Товары / обновить товар</h2>
                        <div className={styles.line}></div>
                    </section>

                    <form onSubmit={handleUpdate}>
                        <div className={styles.select_section}>
                            <h3>Выберите категорию</h3>
                            <Select
                                options={categoriesList.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                                styles={customStyles}
                                name="category"
                                placeholder="Выберите категорию"
                                onChange={(selectedOption) =>
                                    handleFormChange("category_id", selectedOption.value)
                                }
                                value={categoriesList.find(
                                    (category) => category.id === formState.category_id
                                )}
                            />
                        </div>

                        <div className={styles.select_section}>
                            <h3>Выберите коллекцию</h3>
                            <Select
                                options={collectionsList.map((collection) => ({
                                    value: collection.ID,
                                    label: collection.name,
                                }))}
                                styles={customStyles}
                                name="collection"
                                placeholder="Выберите коллекцию"
                                onChange={(selectedOption) =>
                                    handleFormChange("collection_id", selectedOption.value)
                                }
                                value={collectionsList.find(
                                    (collection) => collection.ID === formState.collection_id
                                )}
                            />
                        </div>

                        {formState.items.map((item, index) => (
                            <section key={index} className={styles.info_container}>
                                <h4>
                                    {item.language_code === "ru"
                                        ? "Русский"
                                        : item.language_code === "kgz"
                                            ? "Кыргызча"
                                            : "English"}
                                </h4>
                                <label>
                                    <h5>Название</h5>
                                    <input
                                        type="text"
                                        placeholder="Название"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleCollectionChange(index, "name", e.target.value)
                                        }
                                    />
                                </label>
                                <label>
                                    <h5>Описание</h5>
                                    <textarea
                                        placeholder="Описание"
                                        value={item.description}
                                        onChange={(e) =>
                                            handleCollectionChange(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                            </section>
                        ))}

                        <div className={styles.filters}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formState.isPopular}
                                    onChange={() =>
                                        handleFormChange("isPopular", !formState.isPopular)
                                    }
                                />
                                Популярный товар
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formState.isNew}
                                    onChange={() => handleFormChange("isNew", !formState.isNew)}
                                />
                                Новый товар (новинка)
                            </label>
                        </div>

                        <div className={styles.photos}>
                            <p>Фотографии</p>
                            <div className={styles.grid}>
                                {photos.map((photo, index) => (
                                    <div key={index} className={styles.cardWrapper}>
                                        <div
                                            className={styles.card}
                                            style={{height: "300px", width: "300px"}}
                                        >
                                            {photo.file ? (
                                                <img
                                                    src={URL.createObjectURL(photo.file)}
                                                    alt={`Фото ${index + 1}`}
                                                />
                                            ) : (
                                                <input
                                                    style={{height: "300px", width: "300px"}}
                                                    type="file"
                                                    onChange={(e) =>
                                                        handleFileChange(index, e.target.files[0])
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div className={styles.colors}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`main-photo`}
                                                    checked={photo.isMain}
                                                    onChange={() =>
                                                        handlePhotoFieldChange(index, "isMain", true)
                                                    }
                                                />
                                                Главная
                                            </label>
                                            <input
                                                type="color"
                                                value={photo.hashColor}
                                                onChange={(e) =>
                                                    handlePhotoFieldChange(
                                                        index,
                                                        "hashColor",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePhoto(index)}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddPhoto}
                                    style={{height: "300px", width: "300px"}}
                                >
                                    Добавить фото
                                </button>
                            </div>
                        </div>

                        <button type="submit" className={styles.saveButton}>
                            Обновить
                        </button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UpdateProduct;
