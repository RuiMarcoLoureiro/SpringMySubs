import { createSlice } from "@reduxjs/toolkit";

import { periodsApi } from "./periodsApi";

const initialState = {
    data: [],
};

const periodsSliceName = "periods";
const periodsSlice = createSlice({
    name: periodsSliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            periodsApi.endpoints.getPeriods.matchFulfilled,
            (state, { payload }) => {
                state.data = payload;
            }
        );
    },
});

export const {} = periodsSlice.actions;
export default periodsSlice;
