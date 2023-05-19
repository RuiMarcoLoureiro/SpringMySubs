import { createSlice } from "@reduxjs/toolkit";

import { subscriptionApi } from "./subscriptionApi";

const initialState = {
    // Daily
    amount: 0,
};

const subscriptionSliceName = "subscription";
const subscriptionSlice = createSlice({
    name: subscriptionSliceName,
    initialState,
    reducers: {
        setAmountAction: (state, action) => {
            state.amount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            subscriptionApi.endpoints.sortFilterSubscriptions.matchFulfilled,
            (state, { payload }) => {
                // Calculate the amount of the subscriptions after the fetch --> daily based
                state.amount = 0;
                payload.map((subscription) => {
                    const { cost, periods_id } = subscription;
                    switch (periods_id) {
                        case 2: // Weekly
                            state.amount += cost / 7;
                            break;
                        case 3: // Monthly
                            state.amount += cost / 30.437;
                            break;
                        case 4: // Yearly
                            state.amount += cost / 365.2422;
                            break;
                        default:
                            state.amount += cost;
                    }
                });
            }
        );
    },
});

export const { setAmountAction } = subscriptionSlice.actions;
export default subscriptionSlice;
