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
    const { categoryId = 0, value = [0, 1000] } = categoryAndFilter;
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?offset=0&limit=10&categoryId=${categoryId}&price_min=${value[0]}&price_max=${value[1]}`
      );
      if (response.status === 200) {
        const changeData = response.data.map((element: ProductItem) => {
          return { ...element, favorites: false };
        });
        console.log(changeData);

        return changeData;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const res = await axios("https://api.escuelajs.co/api/v1/users");
    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    }
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
});

export const createUser = createAsyncThunk<
  any,
  { name: string; img: string; email: string; password: string }
>("newUser/createUser", async ({ name, img, email, password }) => {
  try {
    const res = await axios.post(`https://api.escuelajs.co/api/v1/users`, {
      name: name,
      email: email,
      password: password,
      avatar: img,
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk<
  any,
  { email: string; name: string }
>("updateUser/updateUser", async ({ email, name }) => {
  try {
    const res = await axios.put("");
    if (res.status == 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error)
  }
});
