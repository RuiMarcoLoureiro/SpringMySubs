import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
};

const drawerSliceName = "drawer";
const drawerSlice = createSlice({
    name: drawerSliceName,
    initialState,
    reducers: {
        openAction: (state) => {
            state.isOpened = true;
        },
        closeAction: (state) => {
            state.isOpened = false;
        },
        toggleIsOpenedAction: (state) => {
            state.isOpened = !state.isOpened;
        },
    },
});

export const { openAction, closeAction, toggleIsOpenedAction } =
    drawerSlice.actions;
export default drawerSlice;
