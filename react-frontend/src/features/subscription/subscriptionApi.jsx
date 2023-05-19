/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import values from "lodash.values";

import { apiBaseUrl } from "../../app/constants";

const subscriptionApiName = "subscriptionApi";
const subscriptionApi = createApi({
    reducerPath: subscriptionApiName,
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        // Query endpoints: They are endpoints for requests that retrieve data.
        // Meaning for reading data from the server, we use queries.
        showSubscriptions: builder.query({
            query: ({ id }) => ({
                url: "showSubscriptions",
                method: "POST",
                credentials: "include",
                body: { id },
            }),
            // Transform and normalize API response
            transformResponse: (response) => {
                // rename subscriptions_id to id
                return response.map((row) => {
                    return { ...row, id: row.subscriptions_id };
                });
            },
        }),
        sortFilterSubscriptions: builder.query({
            query: ({ id, categories_id, sortColumn, sortASC = true }) => ({
                url: "sortFilterSubscriptions",
                method: "POST",
                credentials: "include",
                body: { id, categories_id, sortColumn, sortASC },
            }),
            // Transform and normalize API response
            transformResponse: (response) => {
                // rename subscriptions_id to id
                return response.map((row) => {
                    return { ...row, id: row.subscriptions_id };
                });
            },
        }),
        // Query endpoints: They are endpoints for requests that retrieve data.
        // Meaning for reading data from the server, we use queries.
        subscriptionUsersSubbed: builder.query({
            query: ({ subscriptions_id }) => ({
                url: "usersSubbed",
                method: "POST",
                credentials: "include",
                body: { subscriptions_id },
            }),
            providesTags: ["Users"],
        }),
        subscriptionUsersNotSubbed: builder.query({
            query: ({ subscriptions_id }) => ({
                url: "usersNotSubbed",
                method: "POST",
                credentials: "include",
                body: { subscriptions_id },
            }),
            providesTags: ["Users"],
            // Transform and normalize API response
            transformResponse: (response) => {
                return values(response);
            },
        }),
        subscriptionTotalUsersSubbed: builder.query({
            query: ({ subscriptions_id }) => ({
                url: "usersSubbed",
                method: "POST",
                credentials: "include",
                body: { subscriptions_id },
            }),
            transformResponse: (response) => {
                return { total: response.length };
            },
        }),
        // Mutation endpoints:
        // As opposed to queries, mutations endpoints are used for creating, updating, and deleting data.
        addSubscription: builder.mutation({
            query: ({
                id,
                name,
                cost,
                periods_id,
                categories_id,
                accepted,
            }) => ({
                url: "addSubscription",
                method: "POST",
                credentials: "include",
                body: { id, name, cost, periods_id, categories_id, accepted },
            }),
        }),
        updateSubscription: builder.mutation({
            query: ({ id, name, cost, periods_id, categories_id }) => ({
                url: "updateSubscription",
                method: "POST",
                credentials: "include",
                body: { id, name, cost, periods_id, categories_id },
            }),
        }),
        deleteSubscription: builder.mutation({
            query: ({ subscriptions_id, users_id }) => ({
                url: "deleteSubscription",
                method: "POST",
                credentials: "include",
                body: { subscriptions_id, users_id },
            }),
            invalidatesTags: ["Users"],
        }),
        shareSubscription: builder.mutation({
            query: ({ subscriptions_id, users_id, accepted = 1 }) => ({
                url: "shareSubscription",
                method: "POST",
                credentials: "include",
                body: { subscriptions_id, users_id, accepted },
            }),
            invalidatesTags: ["Users"],
        }),
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
} = subscriptionApi;
