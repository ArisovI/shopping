import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../types/types";

interface FavoriteState {
  favorites: ProductItem[];
}

const initialState = {
  favorites: [],
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
    },
    delteToFavorite: (state: FavoriteState, action) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(
          (element) => element.id !== action.payload.id
        );
      }
    },
    deleteAll: (state:FavoriteState) =>{
      state.favorites = [];
    }
  },
});
export const { addToFavorite, delteToFavorite, deleteAll } = favoriteSlice.actions;
export default favoriteSlice.reducer;
