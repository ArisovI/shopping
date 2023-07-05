import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentsItem, CommentState } from "../../types/types";

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  isError: null,
};

export const getComments = createAsyncThunk<
  CommentsItem[],
  undefined,
  { rejectValue: string }
>("comments/getComments", async function (_, { rejectWithValue }) {
  const response = await axios.get("https://dummyjson.com/posts?limit=10");

  if (response.status === 200) {
    console.log(response.data.posts);

    return response.data.posts;
  }
  return rejectWithValue("error");
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      });
  },
});

export default commentsSlice.reducer;
