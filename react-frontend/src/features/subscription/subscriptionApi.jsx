/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { apiBaseUrl } from "../../app/constants";

const subscriptionApiName = "subscriptionApi";
const subscriptionApi = createApi({
    reducerPath: subscriptionApiName,
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth.user;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        // Query endpoints: They are endpoints for requests that retrieve data.
        // Meaning for reading data from the server, we use queries.
        showSubscriptions: builder.query({
            query: () => ({
                url: "subscription/",
                method: "GET",
            }),
        }),
        sortFilterSubscriptions: builder.query({
            query: ({ categories_id, sortColumn, sortASC = true }) => ({
                url: "subscription/sortFilterSubscriptions",
                method: "POST",
                body: { categoryId: categories_id, sortColumn, sortASC },
            }),
            // Transform and normalize API response
            transformResponse: (response) => {
                return response.map((row) => {
                    return { 
                        ...row, 
                        periods_id: row.period.id,
                        categories_id: row.category.id,
                    };
                });
            },
        }),
        // Query endpoints: They are endpoints for requests that retrieve data.
        // Meaning for reading data from the server, we use queries.
        lastPrice: builder.query({
            query: () => ({
                url: "subscription/lastPrice",
                method: "GET",
            }),
        }),
        subscriptionUsersSubbed: builder.query({
            query: ({ subscriptions_id }) => ({
                url: "subscription/usersSubbed",
                method: "POST",
                body: { subscriptionId: subscriptions_id },
            }),
            providesTags: ["Users"],
            // Transform and normalize API response
            transformResponse: (response) => {
                let formattedResponse = []
                response.map((row) => {
                    formattedResponse.push({
                        id : row.subscription.id,
                        name: row.user.username,
                        users_id: row.user.id,
                        subscriptions_id: row.subscription.id,
                        accepted: row.subscriptionUser.accepted
                    });
                });
                return formattedResponse;
            },
        }),
        subscriptionUsersNotSubbed: builder.query({
            query: ({ subscriptions_id }) => ({
                url: "subscription/usersNotSubbed",
                method: "POST",
                body: { subscriptionId: subscriptions_id },
            }),
            providesTags: ["Users"],
            // Transform and normalize API response
            transformResponse: (response) => {
                let formattedResponse = []
                response.map((row) => {
                    formattedResponse.push({
                        id : row.subscription.id,
                        name: row.user.username,
                        users_id: row.user.id,
                        subscriptions_id: row.subscription.id,
                        accepted: row.subscriptionUser.accepted
                    });
                });
                return formattedResponse;
            },
        }),
        subscriptionTotalUsersSubbed: builder.query({
            query: ({ subscriptions_id }) => ({
                url: "subscription/usersSubbed",
                method: "POST",
                body: { subscriptionId: subscriptions_id },
            }),
            transformResponse: (response) => {
                return { total: response.length };
            },
        }),
        // Mutation endpoints:
        // As opposed to queries, mutations endpoints are used for creating, updating, and deleting data.
        addSubscription: builder.mutation({
            query: ({
                name,
                cost,
                periods_id,
                categories_id,
            }) => ({
                url: "subscription/",
                method: "PUT",
                body: {
                    name,
                    cost,
                    category: {
                        id: categories_id,
                        name: "dummy",
                    },
                    period: {
                        id: periods_id,
                        name: "dummy",
                    },
                },
            }),
        }),
        updateSubscription: builder.mutation({
            query: ({ id, name, cost, periods_id, categories_id }) => ({
                url: "subscription/updateSubscription",
                method: "POST",
                body: { id, name, cost, periods_id, categories_id },
            }),
        }),
        deleteSubscription: builder.mutation({
            query: ({ subscriptions_id, users_id }) => ({
                url: "subscription/deleteSubscription",
                method: "POST",
                body: { subscriptions_id, users_id },
            }),
            invalidatesTags: ["Users"],
        }),
        shareSubscription: builder.mutation({
            query: ({ subscriptions_id, users_id, accepted = 1 }) => ({
                url: "subscription/shareSubscription",
                method: "POST",
                body: { subscriptions_id, users_id, accepted },
            }),
            invalidatesTags: ["Users"],
        }),
        askPrice: builder.mutation({
            query: ({ subscription_name, }) => ({
                url: "subscription/price",
                method: "POST",
                body: { subscriptionName: subscription_name },
            }),
        })
    }),
});

export { subscriptionApi };
export const {
    useShowSubscriptionsQuery,
    useSortFilterSubscriptionsQuery,
    useSubscriptionUsersSubbedQuery,
    useSubscriptionUsersNotSubbedQuery,
    useSubscriptionTotalUsersSubbedQuery,
    useAddSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useShareSubscriptionMutation,
    useAskPriceMutation,
    useLastPriceQuery
} = subscriptionApi;
