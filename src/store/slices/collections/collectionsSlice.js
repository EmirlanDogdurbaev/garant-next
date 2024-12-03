// ${API_URL}

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "@/store/api/api.js";

export const fetchAllCollections = createAsyncThunk(
    "admin/collections/fetchAllCollections",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/getAllCollection`);

            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const deleteCollectionById = createAsyncThunk(
    "admin/collections/deleteCollectionById",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API_URL}/collection`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: {id},
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const collectionUpdateById = createAsyncThunk(
    "admin/collections/updateCollectionById",
    async ({id, data}, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            formData.append("collection", JSON.stringify(data.collection));
            formData.append("photos", data.photos);
            formData.append("isMain_" + data.photos.name, data.isMain);
            formData.append("hashColor_" + data.photos.name, data.hashColor);

            const response = await axios.put(
                `${API_URL}/collections?collection_id=${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
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

export const getCollectionById = createAsyncThunk(
    "collections/getCollectionById",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/collection?collection_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка получения данных коллекции");
        }
    }
);


export const fetchFilteredCollections = createAsyncThunk(
    "collections/fetchFilteredCollections",
    async (filters, {rejectWithValue}) => {
        try {
            // Преобразуем фильтры в строку query-параметров
            const queryParams = new URLSearchParams(filters).toString();

            const response = await axios.get(`${API_URL}/searchCollections?${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Ошибка получения данных коллекции"
            );
        }
    }
);


const collectionsSlice = createSlice({
    name: "collections",
    initialState: {
        data: [],
        filteredData: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetCollection(state) {
            state.collection = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCollectionById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCollectionById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.collection = action.payload; // Данные коллекции
            })
            .addCase(getCollectionById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; // Сообщение об ошибке
            })
            .addCase(fetchAllCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(deleteCollectionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollectionById.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || "Произошла ошибка";
                }
            })
            .addCase(deleteCollectionById.fulfilled, (state, action) => {
                state.loading = false;
                // Используйте ID из meta.arg, если в payload нет нужного id
                state.data = state.data.filter((item) => item.id !== action.meta.arg);
            })

            .addCase(collectionUpdateById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(collectionUpdateById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(collectionUpdateById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchFilteredCollections.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFilteredCollections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.filteredData = action.payload;
            })
            .addCase(fetchFilteredCollections.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Произошла ошибка при загрузке данных";
            });
    },
});
export const {resetCollection} = collectionsSlice.actions;
export default collectionsSlice.reducer;
