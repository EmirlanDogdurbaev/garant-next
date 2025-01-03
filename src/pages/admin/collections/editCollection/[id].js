import styles from "./editCollections.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {fetchAllCollections} from "@/store/slices/collections/collectionsSlice";
import {fetchCategories} from "@/store/slices/categories/categoriesSlice";
import {API_URL} from "@/store/api/api";

const UpdateProducts = () => {
    const router = useRouter();
    const {id} = router.query
    const dispatch = useDispatch();
    const categoriesList = useSelector((state) => state.categories.categories);
    const collectionsList = useSelector((state) => state.collections.data);
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
        // Загружаем списки категорий и коллекций
        dispatch(fetchAllCollections());
        dispatch(fetchCategories());

        // Загружаем данные товара
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${API_URL}/getCollectionById?collection_id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log(response.data)
                const productData = response.data;

                // Обновляем состояние формы
                setFormState({
                    price: productData.price || 0,
                    isProducer: productData.isProducer || false,
                    isPainted: productData.isPainted || false,
                    isPopular: productData.is_popular || false,
                    isNew: productData.is_new || false,
                    category_id: productData.category_id || null,
                    collection_id: productData.collection_id || null,
                    items: productData.items || [
                        {name: "", description: "", language_code: "ru"},
                        {name: "", description: "", language_code: "kgz"},
                        {name: "", description: "", language_code: "en"},
                    ],
                });

                // Заполняем фотографии
                setPhotos(
                    productData.photos.map((photo) => ({
                        file: null, // В случае загрузки из URL файлов не будет
                        isMain: photo.isMain,
                        hashColor: photo.hashColor,
                        url: photo.url, // Для отображения существующих фото
                    }))
                );

                setLoading(false);
            } catch (err) {
                setError("Ошибка загрузки данных товара.");
                console.error(err);
            }
        };

        fetchProductData();
    }, [dispatch, id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "item",
            JSON.stringify({
                price: formState.price,
                isProducer: formState.isProducer,
                isPainted: formState.isPainted,
                is_popular: formState.isPopular,
                is_new: formState.isNew,
                items: formState.items,
                collection_id: formState.collection_id,
                category_id: formState.category_id,
                size: "M",
            })
        );

        photos.forEach((photo, index) => {
            if (photo.file) {
                formData.append(`photos`, photo.file);
                formData.append(`photos[${index}][isMain]`, photo.isMain);
                formData.append(`photos[${index}][hashColor]`, photo.hashColor);
            }
        });

        try {
            const response = await axios.put(`${API_URL}/items?item_id=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Успешно обновлено:", response.data);
        } catch (err) {
            setError(err.response?.data || "Ошибка при обновлении товара.");
            console.error("Ошибка:", err);
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className={styles.AddCollection}>
            <div className={styles.inner}>
                <section className={styles.title}>
                    <h2>Коллекции / добавить товар</h2>
                    <div className={styles.line}></div>
                </section>

                <form onSubmit={handleSubmit}>
                    {/* Select for categories */}
                    <div className={styles.select_section}>
                        <h3>Выберите категорию</h3>
                        {/*<Select*/}
                        {/*    options={categoriesList.map((category) => ({*/}
                        {/*        value: category.id,*/}
                        {/*        label: category.name,*/}
                        {/*    }))}*/}
                        {/*    styles={customStyles}*/}
                        {/*    name="category"*/}
                        {/*    placeholder="Выберите категорию"*/}
                        {/*    onChange={(selectedOption) =>*/}
                        {/*        handleFormChange("category_id", selectedOption.value)*/}
                        {/*    }*/}
                        {/*/>*/}
                    </div>

                    {/* Select for collections */}
                    <div className={styles.select_section}>
                        <h3>Выберите коллекцию</h3>
                        {/*<Select*/}
                        {/*    options={collectionsList.map((collection) => ({*/}
                        {/*        value: collection.ID,*/}
                        {/*        label: collection.name,*/}
                        {/*    }))}*/}
                        {/*    styles={customStyles}*/}
                        {/*    name="collection"*/}
                        {/*    placeholder="Выберите коллекцию"*/}
                        {/*    onChange={(selectedOption) =>*/}
                        {/*        handleFormChange("collection_id", selectedOption.value)*/}
                        {/*    }*/}
                        {/*/>*/}
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
                                        handleCollectionChange(index, "description", e.target.value)
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
                                    <div className={styles.card} style={{height: "300px", width: "300px"}}>
                                        {photo.file ? (
                                            <img
                                                src={URL.createObjectURL(photo.file)}
                                                alt={`Фото ${index + 1}`}
                                            />
                                        ) : (
                                            <input
                                                style={{height: "300px", width: "300px"}}
                                                type="file"
                                                onChange={(e) => handleFileChange(index, e.target.files[0])}
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
                                                handlePhotoFieldChange(index, "hashColor", e.target.value)
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
                            <button type="button" onClick={handleAddPhoto} style={{height: "300px", width: "300px"}}>
                                Добавить фото
                            </button>
                        </div>
                    </div>


                    <button type="submit" className={styles.saveButton}>
                        Сохранить
                    </button>
                    {error && <p style={{color: "red"}}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default UpdateProducts;
