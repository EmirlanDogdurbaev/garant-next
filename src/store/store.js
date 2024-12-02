import {configureStore} from "@reduxjs/toolkit";
import languageReducer from "./slices/languages/languageSlice";
import productReducer from "./slices/products/productsSlice"
import reviewsReducer from "./slices/reviews/reviewsSlice"
import brandsReducer from "./slices/brands/brandsSlice"

const store = configureStore({
    reducer: {
        language: languageReducer,
        products: productReducer,
        reviews: reviewsReducer,
        brands: brandsReducer,
    },
});

export default store;
