import styles from "./AllDiscount.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Link from "next/link";
import AdminLayout from "@/pages/admin/layout";
import {setPage} from "@/store/slices/pagination/pagination";
import {fetchDiscountProducts} from "@/store/slices/products/productsSlice";
import {API_URL} from "@/store/api/api";

const AllDiscount = () => {
    const dispatch = useDispatch();
    const {currentPage, itemsPerPage2} = useSelector((state) => state.pagination);
    const discounts = useSelector((state) => state.products.discount);

    useEffect(() => {
        dispatch(fetchDiscountProducts())
    }, [])


    const startIndex = (currentPage - 1) * itemsPerPage2;
    const endIndex = startIndex + itemsPerPage2;

    const totalPages = Math.ceil((discounts?.length || 0) / itemsPerPage2);
    const currentItems = discounts?.slice(startIndex, endIndex) || [];

    const handlePageChange = (page) => {
        dispatch(setPage(page));
    };

    console.log(discounts)

    const handleDelete = async (id) => {
        if (!confirm("Вы уверены, что хотите удалить эту коллекцию?")) return;
        try {
            const response = await fetch(`${API_URL}/discount`, {id},{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении коллекции");
            }
            alert("Коллекция успешно удалена");
            fetchDiscountProducts();
        } catch (error) {
            console.error("Ошибка при удалении коллекции:", error);
            alert(error.message || "Не удалось удалить коллекцию.");
        }
    };

    return (
        <AdminLayout>
            <div className={styles.AllVacancy}>
                <div className={styles.inner}>
                    <h3>Все вакансии</h3>
                    <section className={styles.search}>

                        <button className={styles.add_btn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"
                                 fill="none">
                                <path
                                    d="M21.6797 12.5C21.6797 12.6554 21.618 12.8044 21.5081 12.9143C21.3982 13.0242 21.2492 13.0859 21.0938 13.0859H13.0859V21.0938C13.0859 21.2492 13.0242 21.3982 12.9143 21.5081C12.8044 21.618 12.6554 21.6797 12.5 21.6797C12.3446 21.6797 12.1956 21.618 12.0857 21.5081C11.9758 21.3982 11.9141 21.2492 11.9141 21.0938V13.0859H3.90625C3.75085 13.0859 3.60181 13.0242 3.49193 12.9143C3.38204 12.8044 3.32031 12.6554 3.32031 12.5C3.32031 12.3446 3.38204 12.1956 3.49193 12.0857C3.60181 11.9758 3.75085 11.9141 3.90625 11.9141H11.9141V3.90625C11.9141 3.75085 11.9758 3.60181 12.0857 3.49193C12.1956 3.38204 12.3446 3.32031 12.5 3.32031C12.6554 3.32031 12.8044 3.38204 12.9143 3.49193C13.0242 3.60181 13.0859 3.75085 13.0859 3.90625V11.9141H21.0938C21.2492 11.9141 21.3982 11.9758 21.5081 12.0857C21.618 12.1956 21.6797 12.3446 21.6797 12.5Z"
                                    fill="white"
                                />
                            </svg>
                            <Link href={"/admin/discount/addDiscount"} style={{color: "white"}}>Добавить новый скидочный
                                продукт</Link>
                        </button>
                    </section>

                    <div className={styles.tableContainer}>
                        {discounts && discounts.length > 0 ? (
                            <table className={styles.customTable}>
                                <thead>
                                <tr>
                                    <th>Должность</th>
                                    <th>старая цена</th>
                                    <th>новая цена</th>
                                    <th>процент скидки</th>
                                    <th>тип продукта</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className={styles.title1}>{item.name}</td>
                                        <td>{item.old_price} сом</td>
                                        <td>{item.new_price}</td>
                                        <td>{item.discount_percentage} %</td>
                                        <td>{item.discount_type} </td>
                                        <td>
                                            <button
                                                className={styles.actionButton}
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                delete
                                            </button>
                                        </td>


                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noVacancies}>Вакансий нет</p>
                        )}
                    </div>

                    {discounts && discounts.length > 0 && (
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
            </div>

        </AdminLayout>
    );
};

export default AllDiscount;
