import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createBrand} from "@/store/slices/brands/brandsSlice";
import AdminLayout from "@/pages/admin/layout";

const AddBrand = () => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.brands);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBrand({name, photo}));
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Brand Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Brand Photo:
                        <input
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Brand"}
                </button>
                {error && <p style={{color: "red"}}>Error: {error}</p>}
            </form>
        </AdminLayout>
    );
};

export default AddBrand;
