import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {configureStore} from '@reduxjs/toolkit';
import productsReducer from "../../store/slices/products/productsSlice"
import {fetchCollectionById, fetchProductById} from "@/store/slices/products/productsSlice";
import {API_URL} from "@/store/api/api";

describe('products slice async actions', () => {
    let mock;
    let store;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        store = configureStore({
            reducer: {
                products: productsReducer,
                language: () => ({selectedLanguage: 'en'}),
            },
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('should fetch collection by ID successfully', async () => {
        const mockData = {id: 1, name: 'Collection 1'};
        mock.onGet(`${API_URL}/collection?collection_id=1&lang=en`).reply(200, mockData);

        await store.dispatch(fetchCollectionById(1));

        const state = store.getState().products;
        expect(state.selectedProduct).toEqual(mockData);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should handle fetchCollectionById failure', async () => {
        mock.onGet(`${API_URL}/collection?collection_id=1&lang=en`).reply(500);

        await store.dispatch(fetchCollectionById(1));

        const state = store.getState().products;
        expect(state.error).toBe('failed request');
        expect(state.loading).toBe(false);
    });

    it('should fetch product by ID successfully', async () => {
        const mockData = {id: 2, name: 'Product 2'};
        mock.onGet(`${API_URL}/item?item_id=2&lang=en`).reply(200, mockData);

        await store.dispatch(fetchProductById(2));

        const state = store.getState().products;
        expect(state.selectedProduct).toEqual(mockData);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should handle fetchProductById failure', async () => {
        mock.onGet(`${API_URL}/item?item_id=2&lang=en`).reply(404, {message: 'Failed to fetch product'});

        await store.dispatch(fetchProductById(2));

        const state = store.getState().products;
        expect(state.error).toBe('Failed to fetch product');
        expect(state.loading).toBe(false);
    });
});
