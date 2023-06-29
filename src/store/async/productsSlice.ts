import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductState } from "../../types/types";

export const getProducts = createAsyncThunk<
  ProductState[],
  undefined,
  { rejectValue: string }
>("products/getProducts", async function (_, { rejectWithValue }) {
  // const res = await fetch(
  //   "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
  // );

  // if (!res.ok) {
  // }

  // const data = await res.json();

  // return data;
  const response = await axios.get(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
  );

  if (response.status === 200) {
    return response.data;
  }
  return rejectWithValue("error");
});

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
