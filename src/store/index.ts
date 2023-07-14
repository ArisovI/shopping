import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./async/productsSlice";
import commentReducer from "./async/commentSlice";
import authReducer from "./async/authSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
