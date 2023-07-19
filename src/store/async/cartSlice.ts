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
        state.cart.push({ ...action.payload, count: 1 });
      } else {
        state.cart = state.cart.map((element) => {
          if (element.id === action.payload.id) {
            element.count++;
          }
          return element;
        });
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

    plusCount: (state: CartState, action) => {
      state.cart = state.cart.map((element) => {
        if (element.id === action.payload) {
          element.count++;
        }
        return element;
      });
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
