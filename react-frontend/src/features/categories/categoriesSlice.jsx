import { createSlice } from "@reduxjs/toolkit";

import { categoriesApi } from "./categoriesApi";

const initialState = {
    data: [],
};

const categoriesSliceName = "categories";
const categoriesSlice = createSlice({
    name: categoriesSliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            categoriesApi.endpoints.getCategories.matchFulfilled,
            (state, { payload }) => {
                state.data = payload;
            }
        );
    },
});

export const {} = categoriesSlice.actions;
export default categoriesSlice;
