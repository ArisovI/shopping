import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import { getToken, getUser } from "./async";
interface AuthState {
  status: boolean;
  info: User;
}
const initialState = {
  status: false,
  info: {
    id: 0,
    name: "User",
    avatar: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    exitUser: (state) => {
      const def = {
        id: 0,
        name: "User",
        avatar: "",
        email: "",
      };
      state.status = false;
      localStorage.removeItem("jwt");
      state.info = def;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getToken.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.info = action.payload;
          state.status = true;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload === 201 || action.payload === 200) {
          state.status = true;
        }
        console.log(state.status);
      });
  },
});

export const { exitUser } = authSlice.actions;
export default authSlice.reducer;
