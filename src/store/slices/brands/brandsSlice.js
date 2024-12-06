import {API_URL} from "@/store/api/api.js";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {log} from "next/dist/server/typescript/utils";

export const fetchBrands = createAsyncThunk(
    "brands/fetchBrands",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/brands`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

export const createBrand = createAsyncThunk(
    "brands/createBrand",
    async ({name, photo}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("photo", photo);

            const response = await axios.post(`${API_URL}/brand`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("успешно создано")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateBrand = createAsyncThunk(
    "brands/updateBrand",
    async ({brandId, name, photo}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            if (photo) {
                formData.append("photo", photo);
            }

            const response = await axios.put(
                `${API_URL}/brand?id=${brandId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteBrand = createAsyncThunk(
    "brands/deleteBrand",
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(`${API_URL}/brand`, {id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            console.log()
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }

);

export const fetchBrandById = createAsyncThunk(
    "brands/fetchBrandById",
    async (id, thunkAPI) => {
        const response = await axios.get(`${API_URL}/brand/${id}`);
        return response.data;
    }
);

export const brands = createSlice({
    name: "brands",
    initialState: {
        brands: [],
        brand: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrandById.fulfilled, (state, action) => {
                state.loading = false;
                state.brand = action.payload;
            })
            .addCase(fetchBrandById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.brands.push(action.payload); // Добавляем новый бренд
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.loading = false;
                // Обновляем бренд в массиве брендов
                const index = state.brands.findIndex((brand) => brand.id === action.payload.id);
                if (index !== -1) {
                    state.brands[index] = action.payload;
                }
                // Также обновляем текущий бренд
                state.brand = action.payload;
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.brands = state.brands.filter((brand) => brand.id !== deletedId);
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default brands.reducer;
