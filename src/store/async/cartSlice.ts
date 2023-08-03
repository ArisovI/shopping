import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../types/types";

interface CartState {
  cart: ProductItem[];
}
let checkCart: ProductItem[] = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : [];

const initialState: CartState = {
  cart: checkCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<ProductItem>) => {
      const findItem = state.cart.find((item) => item.id === action.payload.id);

      if (!findItem) {
        state.cart.push({ ...action.payload, count: 1 });
      } else {
        state.cart = state.cart.map((element) => {
          if (element.id === action.payload.id) {
            element.count++;
          }
          return element;
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteToCart: (state: CartState, action: PayloadAction<ProductItem>) => {
      const findItem = state.cart.find((item) => item.id === action.payload.id);
      if (findItem) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteAllToCart: (state: CartState) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    plusCount: (state: CartState, action) => {
      state.cart = state.cart.map((element) => {
        if (element.id === action.payload) {
          element.count++;
        }
        return element;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    minusCount: (state: CartState, action) => {
      state.cart = state.cart.map((element) => {
        if (element.id === action.payload) {
          if (element.count > 1) {
            element.count--;
          }
        }
        return element;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  deleteAllToCart,
  deleteToCart,
  plusCount,
  minusCount,
} = cartSlice.actions;
export default cartSlice.reducer;
