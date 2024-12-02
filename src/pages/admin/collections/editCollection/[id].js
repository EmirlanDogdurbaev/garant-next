import styles from "./editCollections.module.scss";
import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {API_URL} from "@/store/api/api";
import AdminLayout from "@/pages/admin/layout";

const editCollection = () => {
    const router = useRouter();
    const {id} = router.query;

    const [formState, setFormState] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
                .get(`${API_URL}/getCollectionById?collection_id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    const {price, isProducer, isPainted, isPopular, isNew, collections, photos} = response.data;
                    setFormState({price, isProducer, isPainted, isPopular, isNew, collections});
                    setPhotos(photos || []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Ошибка загрузки данных:", err);
                    setError(err.response?.data || err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleFormChange = (field, value) => {
        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCollectionChange = (index, field, value) => {
        const updatedCollections = [...formState.collections];
        updatedCollections[index][field] = value;
        setFormState({...formState, collections: updatedCollections});
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
            "collection",
            JSON.stringify({
                price: formState.price,
                isProducer: formState.isProducer,
                isPainted: formState.isPainted,
                isPopular: formState.isPopular,
                isNew: formState.isNew,
                collections: formState.collections,
            })
        );

        photos.forEach((photo, index) => {
            if (photo.file && photo.isMain !== null && photo.hashColor !== "") {
                formData.append(`photos`, photo.file);
                formData.append(`isMain_${photo.file.name}`, photo.isMain);
                formData.append(`hashColor_${photo.file.name}`, photo.hashColor);
            } else {
                console.log(`Пропущено фото с индексом ${index} из-за отсутствия данных`);
            }
        });

        try {
            const response = await axios.put(`${API_URL}/collection?collection_id=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            alert("Коллекция успешно обновлена");
            router.push("/admin/collections");
        } catch (error) {
            setError(error.response?.data || error.message);
            console.error("Ошибка:", error);
        }
    };

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <AdminLayout>
            <main className={styles.Form}>
                <form onSubmit={handleSubmit}>
                    <section className={styles.title}>
                        <h2>Коллекции / Изменить коллекцию {id}</h2>
                        <div className={styles.line}></div>
                    </section>

                    {formState.collections.map((collection, index) => (
                        <section key={index} className={styles.info_container}>
                            <h4>
                                {collection.language_code === "ru"
                                    ? "Русский"
                                    : collection.language_code === "kgz"
                                        ? "Кыргызча"
                                        : "English"}
                            </h4>
                            <span>
                                <label>
                                    <h5>Название коллекции</h5>
                                    <input
                                        type="text"
                                        placeholder="Название"
                                        value={collection.name}
                                        onChange={(e) =>
                                            handleCollectionChange(index, "name", e.target.value)
                                        }
                                    />
                                </label>
                                <label>
                                    <h5>Цена</h5>
                                    <input
                                        type="number"
                                        placeholder="xxx"
                                        value={formState.price}
                                        onChange={(e) =>
                                            handleFormChange("price", parseFloat(e.target.value))
                                        }
                                    />
                                </label>
                            </span>
                            <label htmlFor="" className={styles.textarea}>
                                <h5>Описание</h5>
                                <textarea
                                    cols="180"
                                    rows="10"
                                    placeholder="Описание коллекции"
                                    value={collection.description}
                                    onChange={(e) =>
                                        handleCollectionChange(index, "description", e.target.value)
                                    }
                                />
                            </label>
                        </section>
                    ))}

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

                    {error && (
                        <p style={{color: "red"}}>
                            {typeof error === "string" ? error : error.message || "Неизвестная ошибка"}
                        </p>
                    )}
                </form>
            </main>
        </AdminLayout>
    );
};

export default editCollection;