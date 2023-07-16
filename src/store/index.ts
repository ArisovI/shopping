import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./async/productsSlice";
import commentReducer from "./async/commentSlice";
import authReducer from "./async/authSlice";
import favoriteReducer from "./async/favoriteSlice";
import cartReducer from "./async/cartSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentReducer,
    auth: authReducer,
    favorites: favoriteReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
