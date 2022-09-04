import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  favList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    removeFromFav: (state, action)=>{
      let newFavList = state.favList.filter((movie)=>{return movie.id !== action.payload.id})
      state.favList = [...newFavList]
    }
  },
});
export const { login, logout, addToFav, removeFromFav } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectFavList = (state) => state.user.favList;

export default userSlice.reducer;
