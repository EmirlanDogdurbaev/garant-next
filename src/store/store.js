import {configureStore} from "@reduxjs/toolkit";
import languageReducer from "./slices/languages/languageSlice";
import productReducer from "./slices/products/productsSlice"
import reviewsReducer from "./slices/reviews/reviewsSlice"
import brandsReducer from "./slices/brands/brandsSlice"
import searchReducer from "./slices/filter/search"
import categoriesReducer from "./slices/categories/categoriesSlice"

const store = configureStore({
    reducer: {
        language: languageReducer,
        products: productReducer,
        reviews: reviewsReducer,
        brands: brandsReducer,
        search:searchReducer,
        categories: categoriesReducer
    },
});

export default store;
