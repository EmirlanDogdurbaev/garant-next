import {configureStore} from "@reduxjs/toolkit";
import languageReducer from "./slices/languages/languageSlice";
import productReducer from "./slices/products/productsSlice";
import reviewsReducer from "./slices/reviews/reviewsSlice";
import brandsReducer from "./slices/brands/brandsSlice";
import searchReducer from "./slices/filter/search";
import categoriesReducer from "./slices/categories/categoriesSlice";
import vacanciesReducer from "./slices/vacancies/vacanciesSlice";
import authReducer from "./slices/auth/authSlice";
import paginationReducer from "./slices/pagination/pagination";
import collectionsReducer from "@/store/slices/collections/collectionsSlice";
import thunk from "redux-thunk";

const store = configureStore({
    reducer: {
        language: languageReducer,
        products: productReducer,
        reviews: reviewsReducer,
        brands: brandsReducer,
        search: searchReducer,
        categories: categoriesReducer,
        vacancies: vacanciesReducer,
        auth: authReducer,
        collections: collectionsReducer,
        pagination: paginationReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

export default store;
