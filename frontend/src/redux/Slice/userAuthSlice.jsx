import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access: null,
    user: null,
    isAuthenticated: false,
    bootstrapped: false,
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.access = action.payload.access;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },

        logoutSuccess: (state) => {
            state.access = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        finishBootstrap: (state) => {
            state.bootstrapped = true;
        }
    },
});

export const { loginSuccess, logoutSuccess,finishBootstrap } = userAuthSlice.actions;
export default userAuthSlice.reducer;