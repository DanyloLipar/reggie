import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState, User } from "./types";

const state: AuthState = {
  isAuth: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    setIsAuth(state) {
      state.isAuth = !state.isAuth;
    },
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
export const { setIsAuth, setUser, clearUser } = authSlice.actions;
