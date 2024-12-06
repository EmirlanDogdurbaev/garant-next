import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand } from "@/store/slices/brands/brandsSlice";
import AdminLayout from "@/pages/admin/layout";
import styles from "./AddBrand.module.scss";
import React from "react";

const AddBrand = () => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.brands);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        dispatch(createBrand({ name, photo }));
    
        setName("");
        setPhoto(null);
    };
    
    return (
        <AdminLayout>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Brand Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Brand Photo:</label>
                        <input
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            className={styles.input}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Brand"}
                    </button>
                    {error && (
                        <p className={styles.errorMessage}>
                            Error: {error}
                        </p>
                    )}
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddBrand;
