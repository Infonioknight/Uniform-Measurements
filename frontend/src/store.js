import { configureStore } from '@reduxjs/toolkit';
import brandSliceReducer from './slices/brand';
import categorySliceReducer from './slices/category';
import customerSliceReducer from './slices/customer';
import userSliceReducer from './slices/authSlice';
import stockSliceReducer from './slices/stock';

const store = configureStore({
  reducer: {
    brand: brandSliceReducer,
    category: categorySliceReducer,
    customer: customerSliceReducer,
    stock: stockSliceReducer,
    auth: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the serializable state invariant middleware
    }),
  devTools: true,
});

export default store;
