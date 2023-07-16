import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../types/types";

interface CartState {
  cart: ProductItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<ProductItem>) => {
      const findItem = state.cart.find((item) => item.id === action.payload.id);

      if (!findItem) {
        state.cart.push(action.payload);
      }
    },
    deleteToCart: (state: CartState, action: PayloadAction<ProductItem>) => {
      const findItem = state.cart.find((item) => item.id === action.payload.id);
      if (findItem) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
    },
    deleteAllToCart: (state: CartState) => {
      state.cart = [];
    },
  },
});

export const { addToCart, deleteAllToCart, deleteToCart } = cartSlice.actions;
export default cartSlice.reducer;
