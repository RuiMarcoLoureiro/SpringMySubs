import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSliceName = "auth";
const authSlice = createSlice({
    name: authSliceName,
    initialState,
    reducers: {
        setUserAction: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signoutAction: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUserAction, signoutAction } = authSlice.actions;
export default authSlice;
