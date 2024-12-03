"use client";

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../api/api";

export const login = createAsyncThunk(
    "auth/login",
    async ({password, username}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                    password,
                    username,
                },
                {headers: {"Content-Type": "application/json"}});
            const token = response.data.token;

            if (typeof window !== "undefined") {
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
            }

            return {username, token};
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || "Failed request");
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        username: null,
        status: "",
        error: null,
    },
    reducers: {
        initializeAuth: (state) => {
            if (typeof window !== "undefined") {
                state.token = localStorage.getItem("token") || null;
                state.username = localStorage.getItem("username") || null;
            }
        },
        logout: (state) => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
            }
            state.token = null;
            state.username = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.username = action.payload.username;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Login failed";
            });
    },
});

export const {logout, initializeAuth} = authSlice.actions;

export default authSlice.reducer;
