import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

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
  },
});

export default authSlice.reducer;
export const { setIsAuth } = authSlice.actions;
