import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../../types/types";

interface FavoriteState {
  favorites: ProductItem[];
}

let checkFavorite: ProductItem[] = localStorage.getItem("favorite")
  ? JSON.parse(localStorage.getItem("favorite") as string)
  : [];


const initialState = {
  favorites: checkFavorite,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state: FavoriteState, action) => {
      const findItem = state.favorites.find(
        (el) => el.id === action.payload.id
      );

      if (!findItem) {
        state.favorites.push({ ...action.payload, favorites: true });
      } else {
        state.favorites = state.favorites.filter(
          (element) => element.id !== action.payload.id
        );
      }
      localStorage.setItem("favorite", JSON.stringify(state.favorites));
    },
    delteToFavorite: (state: FavoriteState, action) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(
          (element) => element.id !== action.payload.id
        );
      }
      localStorage.setItem("favorite", JSON.stringify(state.favorites));
    },
    deleteAll: (state: FavoriteState) => {
      state.favorites = [];
      localStorage.setItem("favorite", JSON.stringify(state.favorites));
    },
  },
});
export const { addToFavorite, delteToFavorite, deleteAll } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
