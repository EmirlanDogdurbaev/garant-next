import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languages/languageSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

export default store;
