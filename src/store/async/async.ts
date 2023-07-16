import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductItem } from "../../types/types";

export const getToken = createAsyncThunk<any>("token/getToken", async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error: any) {
    console.log("we can'/t find your profile token", error.message);
  }
});

export const getUser = createAsyncThunk<
  any,
  { email: string; password: string }
>("user/getUser", async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      {
        email: email,
        password: password,
      }
    );
    if (response.status === 201 || response.status === 200) {
      localStorage.setItem("jwt", response.data.access_token);
      return response.status;
    }
    return;
  } catch (error: any) {
    console.log(error.message);
  }
});

interface categoryAndFilter {
  value: number[];
  categoryId: number;
}

export const getProducts = createAsyncThunk<
  ProductItem[],
  categoryAndFilter,
  { rejectValue: string }
>(
  "products/getProducts",
  async function (categoryAndFilter: categoryAndFilter) {
    const { categoryId, value } = categoryAndFilter;
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?offset=0&limit=10&categoryId=${categoryId}&price_min=${value[0]}&price_max=${value[1]}`
      );
      if (response.status === 200) {
        const changeData = response.data.map((element: ProductItem) => {
          return { ...element, favorites: false };
        });
        return changeData;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
