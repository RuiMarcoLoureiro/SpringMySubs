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
					const { cost, period } = subscription;
					switch (period.name) {
						case "Weekly": // Weekly
							state.amount += cost / 7;
							break;
						case "Monthly": // Monthly
							state.amount += cost / 30.437;
							break;
						case "Yearly": // Yearly
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
