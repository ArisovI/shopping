import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types/types";
import { getProducts } from "./async";

const initialState: ProductState = {
  products: [],
  isLoading: false,
  isError: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
