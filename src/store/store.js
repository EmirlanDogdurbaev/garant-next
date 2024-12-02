import {configureStore} from "@reduxjs/toolkit";
import languageReducer from "./slices/languages/languageSlice";
import productReducer from "./slices/products/productsSlice"

const store = configureStore({
    reducer: {
        language: languageReducer,
        products: productReducer,
    },
});

export default store;
