import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateBrand, fetchBrandById} from "@/store/slices/brands/brandsSlice"; // Функции для работы с API
import {useRouter} from "next/router";
import AdminLayout from "@/pages/admin/layout";

const UpdateBrand = () => {
    const router = useRouter();
    const {id} = router.query; // Получаем ID из маршрута

    const dispatch = useDispatch();
    const {brand, loading, error} = useSelector((state) => state.brands);

    const [name, setName] = useState(""); // Поле для имени бренда
    const [photo, setPhoto] = useState(null); // Поле для загрузки нового фото

    // Получение текущего бренда при загрузке
    useEffect(() => {
        if (id) {
            dispatch(fetchBrandById(id)); // Получаем бренд из API
        }
    }, [id, dispatch]);

    // Заполнение полей формы, если бренд загружен
    useEffect(() => {
        if (brand) {
            setName(brand.name);
        }
    }, [brand]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Формируем данные для отправки
        const formData = new FormData();
        formData.append("name", name);
        if (photo) {
            formData.append("photo", photo);
        }

        // Отправка запроса на обновление
        try {
            await dispatch(updateBrand({id, formData})).unwrap();
            alert("Бренд успешно обновлен!");
            router.push("/admin/brands"); // Возврат на страницу брендов
        } catch (error) {
            console.error("Ошибка при обновлении бренда:", error);
        }
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} style={{maxWidth: "500px", margin: "0 auto"}}>
                <h2>Update Brand</h2>
                <div style={{marginBottom: "1rem"}}>
                    <label>
                        Brand Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{display: "block", width: "100%", padding: "8px", marginTop: "4px"}}
                        />
                    </label>
                </div>
                <div style={{marginBottom: "1rem"}}>
                    <label>
                        Brand Photo (optional):
                        <input
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            style={{display: "block", marginTop: "4px"}}
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading} style={{padding: "10px 20px"}}>
                    {loading ? "Updating..." : "Update Brand"}
                </button>
                {error && <p style={{color: "red", marginTop: "1rem"}}>Error: {error}</p>}
            </form>
        </AdminLayout>
    );
};

export default UpdateBrand;
