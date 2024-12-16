import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../api/api.js";

export const searchByCategory = createAsyncThunk(
    "search/searchByCategory",
    async (categoryId, {getState, dispatch, rejectWithValue}) => {
        try {
            dispatch(clearResults());
            const language = getState().language.selectedLanguage;
            const response = await axios.get(
                `${API_URL}/items?category_id=${categoryId}&lang=${language}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

export const searchByInputValue = createAsyncThunk(
    "products/searchByInputValue",
    async (inputValue, {getState, dispatch, rejectWithValue}) => {
        try {
            dispatch(clearResults());
            const language = getState().language.selectedLanguage;
            const response = await axios.get(
                `${API_URL}/search?lang=${language}&q=${inputValue}`
            );
            return [...response.data.collections, ...response.data.items];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

export const searchByPriceRange = createAsyncThunk(
    "products/searchByPriceRange",
    async (filters, {getState, rejectWithValue}) => {
        try {
            const language = getState().language.selectedLanguage;

            // Формируем объект параметров запроса
            const queryParams = {
                lang: language,
                is_producer: filters.productType,
                is_painted: filters.isPainted,
                min: filters.min,
                max: filters.max,
            };

            // Удаляем undefined значения, чтобы запрос был чистым
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter(([_, value]) => value !== undefined)
            );

            console.log(queryParams)
            // Преобразуем объект в строку запроса
            const queryString = new URLSearchParams(filteredParams).toString();

            // Отправляем запрос с динамическими параметрами
            const response = await axios.get(`${API_URL}/search?${queryString}`);

            console.log(response.data);
            return [...response.data.collections, ...response.data.items];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);


export const fetchByProducerIsPainted = createAsyncThunk(
    "products/fetchByProducerIsPainted",
    async (_, {getState, dispatch, rejectWithValue}) => {
        try {
            dispatch(clearResults());
            const language = getState().language.selectedLanguage;
            const response = await axios.get(
                `${API_URL}/search?lang=${language}&is_producer=true&is_painted=true`
            );

            return [...response.data.collections];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);
export const fetchByProducerIsStandart = createAsyncThunk(
    "products/fetchByProducerIsStandart",
    async (_, {getState, dispatch, rejectWithValue}) => {
        try {
            dispatch(clearResults());
            const language = getState().language.selectedLanguage;
            const response = await axios.get(
                `${API_URL}/search?lang=${language}&is_producer=true&is_painted=false`
            );

            return [...response.data.collections];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

export const fetchByDistributivFilter = createAsyncThunk(
    "products/fetchByDistributiv",
    async (_, {getState, dispatch, rejectWithValue}) => {
        try {
            dispatch(clearResults());
            const language = getState().language.selectedLanguage;
            const response = await axios.get(
                `${API_URL}/search?lang=${language}&is_producer=false`
            );

            return [...response.data.items, ...response.data.collections];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

export const fetchByProducerFilter = createAsyncThunk(
    "products/fetchByProducerFilter",
    async (_, {getState, dispatch, rejectWithValue}) => {
        try {
            dispatch(clearResults());
            const language = getState().language.selectedLanguage;
            const response = await axios.get(
                `${API_URL}/search?lang=${language}&is_producer=true`
            );

            return [...response.data.items, ...response.data.collections];
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);


const search = createSlice({
    name: "search",
    initialState: {
        results: [],
        status: "idle",
        error: null,
        filters: {
            category: null,
            priceRange: {min: 1, max: 100000},
            inputValue: "",
        },
    },
    reducers: {
        setInputValue(state, action) {
            state.filters.inputValue = action.payload;
        },
        setFilterCategory: (state, action) => {
            state.filters.category = action.payload;
        },
        setPriceRange: (state, action) => {
            state.filters.priceRange = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {
                category: null,
                priceRange: {min: 0, max: 10000},
                inputValue: "",
            };
        },
        clearResults: (state) => {
            state.results = [];
            state.error = null
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchByCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchByCategory.fulfilled, (state, action) => {
                state.results = action.payload;
                state.status = "succeeded";
            })
            .addCase(searchByCategory.rejected, (state, action) => {
                state.error = action.payload || "Error fetching category data";
                state.status = "failed";
            })
            .addCase(searchByInputValue.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchByInputValue.fulfilled, (state, action) => {
                state.results = action.payload;
                state.status = "succeeded";
            })
            .addCase(searchByInputValue.rejected, (state, action) => {
                state.error = action.payload || "No product found";
                state.status = "failed";
            })
            .addCase(searchByPriceRange.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchByPriceRange.fulfilled, (state, action) => {
                state.results = action.payload;
                state.status = "succeeded";
            })
            .addCase(searchByPriceRange.rejected, (state, action) => {
                state.error = action.payload || "Error fetching price range data";
                state.status = "failed";
            })
            .addCase(fetchByDistributivFilter.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchByDistributivFilter.fulfilled, (state, action) => {
                state.results = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchByDistributivFilter.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(fetchByProducerFilter.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchByProducerFilter.fulfilled, (state, action) => {
                state.results = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchByProducerFilter.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(fetchByProducerIsPainted.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchByProducerIsPainted.fulfilled, (state, action) => {
                state.results = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchByProducerIsPainted.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(fetchByProducerIsStandart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchByProducerIsStandart.fulfilled, (state, action) => {
                state.results = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchByProducerIsStandart.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            });
    },
});

export const {
    setInputValue,
    setFilterCategory,
    setPriceRange,
    clearFilters,
    clearResults,
    clearError,
} = search.actions;

export default search.reducer;
