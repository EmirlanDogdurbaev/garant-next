import { useDispatch, useSelector } from "react-redux";
import styles from "./AllCollections.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/pages/admin/layout";
import { setPage } from "@/store/slices/pagination/pagination";
import { API_URL } from "@/store/api/api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    p: 4,
    width: "400px",
    textAlign: "center",
};

const AllCollections = () => {
    const dispatch = useDispatch();
    const { currentPage, itemsPerPage2 } = useSelector((state) => state.pagination);

    const [filters, setFilters] = useState({
        lang: "ru",
        is_producer: null,
        is_painted: null,
    });
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchFilteredCollections = async () => {
        setIsLoading(true);
        try {
            const queryParams = Object.entries(filters)
                .filter(([_, value]) => value !== null && value !== "")
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
            const queryString = new URLSearchParams(queryParams).toString();
            const response = await fetch(`${API_URL}/searchCollections?${queryString}`);
            if (!response.ok) throw new Error("Не удалось загрузить данные");
            const data = await response.json();
            setFilteredData(data);
        } catch (error) {
            console.error("Ошибка при фильтрации:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFilteredCollections();
    }, [filters]);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = (id) => {
        setSelectedId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedId(null);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/collections/${selectedId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (!response.ok) throw new Error("Ошибка при удалении коллекции");
            alert("Коллекция успешно удалена");
            fetchFilteredCollections();
        } catch (error) {
            console.error("Ошибка при удалении коллекции:", error);
            alert(error.message || "Не удалось удалить коллекцию.");
        } finally {
            handleCloseModal();
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage2;
    const endIndex = startIndex + itemsPerPage2;

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage2);
    const currentItems = filteredData?.slice(startIndex, endIndex) || [];

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    };

    return (
        <AdminLayout>
            <div className={styles.AllCollections}>
                <section className={styles.search}>
                    <div className={styles.filters}>
                        <select
                            className={styles.select}
                            onChange={(e) => handleFilterChange("is_producer", e.target.value)}
                        >
                            <option value="">Все продукты</option>
                            <option value="true">Продукты производство Garant</option>
                            <option value="false">Дистрибуция</option>
                        </select>
                        <select
                            className={styles.select}
                            onChange={(e) => handleFilterChange("is_painted", e.target.value)}
                        >
                            <option value="">все продукты </option>
                            <option value="true">крашенные</option>
                            <option value="false">не крашенные</option>
                        </select>
                    </div>
                    <Link href="/admin/collections/addCollection" className={styles.add_btn}>
                        Добавить новую коллекцию
                    </Link>
                </section>

                {isLoading ? (
                    <p>Загрузка...</p>
                ) : (
                    <div className={styles.tableContainer}>
                        <table className={styles.customTable}>
                            <thead>
                                <tr>
                                    <th>Наименование</th>
                                    <th>Цена</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className={styles.title}>{item.name}</td>
                                        <td>{item.price} сом</td>
                                        <td className={styles.actions}>
                                            <Link
                                                className={styles.actionButton}
                                                href={`/admin/collections/editCollection/${item.id}`}
                                            >
                                                Редактировать
                                            </Link>
                                            <button
                                                className={styles.actionButton}
                                                onClick={() => handleOpenModal(item.id)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredData && filteredData.length > 0 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            ←
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
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

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2>Удалить коллекцию?</h2>
                    <p>Вы уверены, что хотите удалить эту коллекцию? Это действие нельзя отменить.</p>
                    <div className={styles.modalActions}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            Удалить
                        </Button>
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Отмена
                        </Button>
                    </div>
                </Box>
            </Modal>
        </AdminLayout>
    );
};

export default AllCollections;
