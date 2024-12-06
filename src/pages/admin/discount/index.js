import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/pages/admin/layout";
import { setPage } from "@/store/slices/pagination/pagination";
import { fetchDiscountProducts } from "@/store/slices/products/productsSlice";
import { API_URL } from "@/store/api/api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "./AllDiscount.module.scss";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  width: "400px",
  textAlign: "center",
};

const AllDiscount = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage2 } = useSelector(
    (state) => state.pagination
  );
  const discounts = useSelector((state) => state.products.discount);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchDiscountProducts());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage2;
  const endIndex = startIndex + itemsPerPage2;

  const totalPages = Math.ceil((discounts?.length || 0) / itemsPerPage2);
  const currentItems = discounts?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/discount`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedId }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении коллекции");
      }

      alert("Коллекция успешно удалена");
      closeModal();
      dispatch(fetchDiscountProducts());
    } catch (error) {
      console.error("Ошибка при удалении коллекции:", error);
      alert(error.message || "Не удалось удалить коллекцию.");
    }
  };

  return (
    <AdminLayout>
      <div className={styles.AllVacancy}>
        <div className={styles.inner}>
          <h3>Все продукты со скидкой</h3>
          <section className={styles.search}>
            <button className={styles.add_btn}>
              <Link
                href="/admin/discount/addDiscount"
                style={{ color: "white" }}
              >
                Добавить новый скидочный продукт
              </Link>
            </button>
          </section>

          <div className={styles.tableContainer}>
            {discounts && discounts.length > 0 ? (
              <table className={styles.customTable}>
                <thead>
                  <tr>
                    <th>Должность</th>
                    <th>Старая цена</th>
                    <th>Новая цена</th>
                    <th>Процент скидки</th>
                    <th>Тип продукта</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.old_price} сом</td>
                      <td>{item.new_price}</td>
                      <td>{item.discount_percentage} %</td>
                      <td>{item.discount_type}</td>
                      <td>
                        <button
                          className={styles.actionButton}
                          onClick={() => openModal(item.id)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Нет скидок</p>
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
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={modalStyle} className={styles.box}>
          <h2>Удалить продукт</h2>
          <p>Вы уверены, что хотите удалить этот продукт?</p>
          <spa className={styles.cont}>
            <button onClick={handleDelete} className={styles.btn_yes}>
              Да
            </button>
            <button onClick={closeModal} className={styles.btn_no}>
              Нет
            </button>
          </spa>
        </Box>
      </Modal>
    </AdminLayout>
  );
};

export default AllDiscount;
