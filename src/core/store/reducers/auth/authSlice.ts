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
  },
});

export default authSlice.reducer;
export const { setIsAuth, setUser } = authSlice.actions;
