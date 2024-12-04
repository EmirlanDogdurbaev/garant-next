import reducer, { login, logout, initializeAuth } from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

jest.mock("axios");

describe("authSlice", () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: { auth: reducer },
        });
    });

    it("should handle initial state", () => {
        const initialState = {
            token: null,
            username: null,
            status: "",
            error: null,
        };

        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should handle login.pending", () => {
        const initialState = {
            token: null,
            username: null,
            status: "",
            error: null,
        };

        const action = { type: login.pending.type };
        const state = reducer(initialState, action);
        expect(state.status).toBe("loading");
        expect(state.error).toBeNull();
    });

    it("should handle login.fulfilled", () => {
        const initialState = {
            token: null,
            username: null,
            status: "",
            error: null,
        };

        const action = {
            type: login.fulfilled.type,
            payload: { token: "testtoken", username: "testuser" },
        };
        const state = reducer(initialState, action);
        expect(state.status).toBe("succeeded");
        expect(state.token).toBe("testtoken");
        expect(state.username).toBe("testuser");
    });

    it("should handle login.rejected", () => {
        const initialState = {
            token: null,
            username: null,
            status: "",
            error: null,
        };

        const action = {
            type: login.rejected.type,
            payload: "Invalid credentials",
        };
        const state = reducer(initialState, action);
        expect(state.status).toBe("failed");
        expect(state.error).toBe("Invalid credentials");
    });

    it("should handle logout", () => {
        const initialState = {
            token: "testtoken",
            username: "testuser",
            status: "succeeded",
            error: null,
        };

        const action = { type: logout.type };
        const state = reducer(initialState, action);
        expect(state.token).toBeNull();
        expect(state.username).toBeNull();
    });

    it("should handle initializeAuth", () => {
        localStorage.setItem("token", "testtoken");
        localStorage.setItem("username", "testuser");

        const initialState = {
            token: null,
            username: null,
            status: "",
            error: null,
        };

        const action = { type: initializeAuth.type };
        const state = reducer(initialState, action);
        expect(state.token).toBe("testtoken");
        expect(state.username).toBe("testuser");
    });

    it("should dispatch login action successfully", async () => {
        axios.post.mockResolvedValueOnce({
            data: { token: "testtoken" },
        });

        await store.dispatch(login({ username: "testuser", password: "password" }));

        const state = store.getState().auth;
        expect(state.status).toBe("succeeded");
        expect(state.token).toBe("testtoken");
        expect(state.username).toBe("testuser");
    });

    it("should dispatch login action with error", async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: "Invalid credentials" },
        });

        await store.dispatch(login({ username: "testuser", password: "wrongpassword" }));

        const state = store.getState().auth;
        expect(state.status).toBe("failed");
        expect(state.error).toBe("Invalid credentials");
    });
});
