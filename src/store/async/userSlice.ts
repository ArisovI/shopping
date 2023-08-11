import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetUsersState } from "../../types/types";
import { getUsers } from "./async";

const initialState: GetUsersState = {
  users: [],
  isLoading: false,
  isError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.isError = action.payload;
      });
  },
});

export default usersSlice.reducer;
