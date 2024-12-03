import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "@/store/api/api.js";

// Helper for setting headers
const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
});

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, {getState, rejectWithValue}) => {
        try {
            const language = getState().language.selectedLanguage;
            const response = await axios.get(`${API_URL}/category?lang=${language}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCategoriesById = createAsyncThunk(
    "categories/fetchCategoriesById",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/category/by/id?category_id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (categoryList, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${API_URL}/category`,
                {categories: categoryList},
                {headers: getAuthHeaders()}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API_URL}/category`, {
                headers: getAuthHeaders(),
                data: {id},
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({id, categoryData}, {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `${API_URL}/category?category_id=${id}`,
                categoryData,
                {headers: getAuthHeaders()}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Initial state
const initialState = {
    categories: [],
    loading: false,
    error: null,
};

// Helper reducers
const handlePending = (state) => {
    state.loading = true;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error.message;
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, handlePending)
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, handleRejected)

            .addCase(fetchCategoriesById.pending, handlePending)
            .addCase(fetchCategoriesById.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesById.rejected, handleRejected)

            .addCase(createCategory.pending, handlePending)
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, handleRejected)

            .addCase(deleteCategory.pending, handlePending)
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(
                    (category) => category.id !== action.meta.arg
                );
            })
            .addCase(deleteCategory.rejected, handleRejected)

            .addCase(updateCategory.pending, handlePending)
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCategory = action.payload;
                const index = state.categories.findIndex((category) => category.id === updatedCategory.id);
                if (index !== -1) {
                    state.categories[index] = updatedCategory;
                }
            })
            .addCase(updateCategory.rejected, handleRejected);
    },
});

export default categoriesSlice.reducer;
