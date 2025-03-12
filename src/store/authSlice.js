import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuthenticated: false,
  user: null,
};

const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserAuthenticated = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.isUserAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSLice.actions;

export default authSLice.reducer;
