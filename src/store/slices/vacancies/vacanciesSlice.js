import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "@/store/api/api.js";

export const fetchVacancies = createAsyncThunk(
    "getVacancies/fetchVacancies",
    async (_, {getState, rejectWithValue}) => {
        try {
            const language = getState().language.selectedLanguage;
            const response = await axios.get(`${API_URL}/vacancies?lang=${language}`);
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
            const response = await axios.get(`${API_URL}/vacancy?vacancy_id=${id}`);
            console.log(response.data)
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

export const updateVacancy = createAsyncThunk(
    "vacancies/updateVacancy",
    async ({data}, {rejectWithValue}) => {
        try {
            console.log(data)

            const response = await axios.put(
                `${API_URL}/vacancy`,
                data, // Отправляем данные в указанном формате
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Замените на реальный токен
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to update vacancy:", error);
            return rejectWithValue(error.response?.data || "Ошибка при обновлении вакансии");
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
    reducers: {
        setSelectedVacancy(state, action) {
            state.selectedVacancy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(updateVacancy.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateVacancy.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;

                const index = state.vacancies.findIndex((v) => v.id === action.payload.id);
                if (index !== -1) {
                    state.vacancies[index] = action.payload;
                }
            })
            .addCase(updateVacancy.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

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

export const {setSelectedVacancy} = getVacancy.actions;

export default getVacancy.reducer;
