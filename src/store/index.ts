import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./async/productsSlice";
import commentSlice from "./async/commentSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
