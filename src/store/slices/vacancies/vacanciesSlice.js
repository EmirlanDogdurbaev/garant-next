import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "@/store/api/api.js";

export const fetchVacancies = createAsyncThunk(
    "getVacancies/fetchVacancies",
    async (_, {getState, rejectWithValue}) => {
        try {
            const language = getState().language.selectedLanguage;

            console.log(language)
            const response = await axios.get(`${API_URL}/vacancies?lang=${language}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed fetch data")
        }
    }
);

export const createVacancy = createAsyncThunk(
    "getVacancies/createVacancy",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/vacancy`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchVacancyById = createAsyncThunk(
    "getVacancies/fetchVacancyById",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/vacancy/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteVacancyById = createAsyncThunk(
    "getVacancies/deleteVacancyById",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API_URL}/vacancy`, {
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

export const getVacancy = createSlice({
    name: "vacancy",
    initialState: {
        vacancies: [],
        selectedVacancy: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchVacancies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVacancies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vacancies = action.payload;
            })
            .addCase(fetchVacancies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(createVacancy.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createVacancy.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vacancies.push(action.payload);
            })
            .addCase(createVacancy.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(fetchVacancyById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVacancyById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedVacancy = action.payload;
            })
            .addCase(fetchVacancyById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(deleteVacancyById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteVacancyById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vacancies = state.vacancies.filter(
                    (vacancy) => vacancy.id !== action.meta.arg
                );
            })
            .addCase(deleteVacancyById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default getVacancy.reducer;
