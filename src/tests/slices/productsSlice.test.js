import {resetProducts, setSelectedProduct} from "@/store/slices/products/productsSlice";
import productsReducer from "@/store/slices/products/productsSlice";
describe('products slice reducers', () => {
    const initialState = {
        data: [],
        selectedProduct: [],
        selectedCollection: null,
        productsInCollection: [],
        popularProducts: [],
        newProducts: [],
        filteredProducts: [],
        distr: [],
        discount: [],
        recommendationCollections: [],
        loading: false,
        error: null,
        inputValue: '',
    };

    it('should handle initial state', () => {
        expect(productsReducer(undefined, {})).toEqual(initialState);
    });

    it('should set selected product', () => {
        const action = setSelectedProduct({ id: 1, name: 'Product 1' });
        const newState = productsReducer(initialState, action);

        expect(newState.selectedProduct).toEqual({ id: 1, name: 'Product 1' });
    });

    it('should reset products', () => {
        const modifiedState = { ...initialState, data: [{ id: 1 }] };
        const action = resetProducts();
        const newState = productsReducer(modifiedState, action);

        expect(newState.data).toEqual([]);
    });
});
