import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductItem, ProductState } from "../../types/types";

const initialState: ProductState = {
  products: [],
  isLoading: false,
  isError: null,
};

export const getProducts = createAsyncThunk<
  ProductItem[],
  number,
  { rejectValue: string }
>(
  "products/getProducts",
  async function (categoryId: number, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?offset=0&limit=10&categoryId=${categoryId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error:any) {
      console.log(error.message)
    }
  }
);

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
