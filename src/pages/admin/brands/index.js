import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchBrands} from "@/store/slices/brands/brandsSlice";
import AdminLayout from "@/pages/admin/layout";

export default function allBrands() {
    const dispatch = useDispatch()

    const brands = useSelector((state) => state.brands.brands)

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])
    console.log(brands)
    return (
        <AdminLayout>
            <ul>
                dasdsa
            </ul>
        </AdminLayout>
    )
}