import {API_URL} from "@/store/api/api";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLanguages = createAsyncThunk(
    "language/fetchLanguages",
    async () => {
        const response = await axios.get(`${API_URL}/languages`);
        return response.data;
    }
);

const languageSlice = createSlice({
    name: "language",
    initialState: {
        languages: [],
        selectedLanguage: "ru",
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
        },
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.languages = action.payload;
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {setSelectedLanguage, setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
