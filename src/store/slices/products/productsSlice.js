import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/store/api/api.js";

export const fetchCollectionById = createAsyncThunk(
  "products/fetchCollectionById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const language = getState().language.selectedLanguage;
      const response = await axios.get(
        `${API_URL}/collection?collection_id=${id}&lang=${language}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed request");
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { getState, rejectWithValue }) => {
    const language = getState().language.selectedLanguage;
    try {
      const response = await axios.get(
        `${API_URL}/item?item_id=${productId}&lang=${language}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);

export const fetchProductInCollection = createAsyncThunk(
  "products/fetchProductInCollection",
  async (collectionId, { getState, rejectWithValue }) => {
    try {
      console.log(collectionId);
      const language = getState().language.selectedLanguage;
      const response = await axios.get(
        `${API_URL}/items/collection?collection_id=${collectionId.collectionId}&lang=${language}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

export const fetchPopularProducts = createAsyncThunk(
  "products/fetchPopularProducts",
  async (_, { getState }) => {
    const language = getState().language.selectedLanguage;
    const response = await axios.get(`${API_URL}/popular?lang=${language}`);
    const collection = response.data.collections;
    const item = response.data.items;
    return [...collection, ...item];
  }
);

export const fetchNewProducts = createAsyncThunk(
  "products/fetchNewProducts",
  async (_, { getState }) => {
    const language = getState().language.selectedLanguage;
    const response = await axios.get(`${API_URL}/new?lang=${language}`);
    const collection = response.data.collections;

    const item = response.data.items;
    return [...collection, ...item];
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId, { getState, rejectWithValue }) => {
    try {
      const language = getState().language.selectedLanguage;
      const response = await axios.get(
        `${API_URL}/items?categoryId=${categoryId}&lang=${language}`,
        {
          params: { category_id: categoryId, lang: language },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

export const fetchByProducer = createAsyncThunk(
  "products/fetchByProducer",
  async (_, { getState }) => {
    const language = getState().language.selectedLanguage;
    const response = await axios.get(
      `${API_URL}/search?lang=${language}&is_producer=true`
    );

    return [...response.data.items, ...response.data.collections];
  }
);
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAllItems`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchByDistr = createAsyncThunk(
  "products/fetchByDistr",
  async (_, { getState }) => {
    const language = getState().language.selectedLanguage;
    const response = await axios.get(
      `${API_URL}/search?lang=${language}&is_producer=false`
    );

    console.log(response.data);

    return [...response.data.items, ...response.data.collections];
  }
);

export const fetchRecommendationCollection = createAsyncThunk(
  "products/fetchRecommendationCollection",
  async (_, { rejectWithValue, getState }) => {
    try {
      const language = getState().language.selectedLanguage;
      const response = await axios.get(
        `${API_URL}/collections/rec?lang=${language}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

export const fetchDiscountProducts = createAsyncThunk(
  "products/fetchDiscountProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const language = getState().language.selectedLanguage;

      const response = await axios.get(`${API_URL}/discounts?lang=${language}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "products/deleteProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/items`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
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
    inputValue: "",
  },
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    resetNewProducts: (state) => {
      state.newProducts = [];
    },
    resetProducts: (state) => {
      state.data = [];
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message || "Произошла ошибка";
        }
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== action.meta.arg);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByDistr.fulfilled, (state, action) => {
        state.loading = false;
        state.distr = action.payload;
      })
      .addCase(fetchByDistr.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchByDistr.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch product";
      })

      .addCase(fetchCollectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = "failed request";
      })

      .addCase(fetchProductInCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductInCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.productsInCollection = action.payload;
      })
      .addCase(fetchProductInCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPopularProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.popularProducts = action.payload;
      })
      .addCase(fetchPopularProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchNewProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.newProducts = action.payload;
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchDiscountProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscountProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.discount = action.payload;
      })
      .addCase(fetchDiscountProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchByProducer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByProducer.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchByProducer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchRecommendationCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendationCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecommendationCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendationCollections = action.payload;
      });
  },
});

export const { setSelectedProduct, resetNewProducts, resetProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
