import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductState } from "../../types/types";

const initialState: ProductState = {
  products: [],
  isLoading: false,
  isError: null,
};

export const getProducts = createAsyncThunk<
  ProductState[],
  undefined,
  { rejectValue: string }
>("products/getProducts", async function (_, { rejectWithValue }) {
  const response = await axios.get(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
  );

  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  }

  return rejectWithValue("error");
});

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
