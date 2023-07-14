import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
