import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuthenticated: false,
    userId: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isUserAuthenticated = true;
            state.userId = action.payload.userData.$id;
        },

        logout: (state) => {
            state.isUserAuthenticated = false;
            state.userId = undefined;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
