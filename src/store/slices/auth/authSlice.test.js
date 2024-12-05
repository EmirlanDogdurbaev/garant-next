import { configureStore } from '@reduxjs/toolkit';
import { login } from './authSlice'; // Ваш thunk
import authReducer from './authSlice';
import axios from 'axios';
import thunk from 'redux-thunk';

jest.mock('axios'); // Мок axios для работы с API

describe('authSlice thunks', () => {
    let store;

    beforeEach(() => {
        // Создаем временный store для тестов
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
        });
    });

    it('dispatches fulfilled action when login succeeds', async () => {
        const mockResponse = { token: '123' };
        axios.post.mockResolvedValueOnce({ data: mockResponse });

        await store.dispatch(login({ username: 'testUser', password: 'password123' }));

        const state = store.getState().auth;
        expect(state.token).toBe('123');
        expect(state.username).toBe('testUser');
        expect(state.status).toBe('succeeded');
    });

    it('dispatches rejected action when login fails', async () => {
        const mockError = { response: { data: 'Invalid credentials' } };
        axios.post.mockRejectedValueOnce(mockError);

        await store.dispatch(login({ username: 'testUser', password: 'wrongPassword' }));

        const state = store.getState().auth;
        expect(state.token).toBeNull();
        expect(state.error).toBe('Invalid credentials');
        expect(state.status).toBe('failed');
    });
});
