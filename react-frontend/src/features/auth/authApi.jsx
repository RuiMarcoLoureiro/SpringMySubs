/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { apiBaseUrl } from "../../app/constants";

const authApiName = "authApi";
const authApi = createApi({
    reducerPath: authApiName,
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
    }),
    endpoints: (builder) => ({
        // Query endpoints: They are endpoints for requests that retrieve data.
        // Meaning for reading data from the server, we use queries.
        // ...
        // Mutation endpoints:
        // As opposed to queries, mutations endpoints are used for creating, updating, and deleting data.
        login: builder.mutation({
            query: ({ name, password }) => ({
                url: "login",
                method: "POST",
                credentials: "include",
                body: { name, password },
            }),
        }),
        register: builder.mutation({
            query: ({ name, password }) => ({
                url: "register",
                method: "POST",
                credentials: "include",
                body: { name, password },
            }),
        }),
    }),
});

export { authApi };
export const { useLoginMutation, useRegisterMutation } = authApi;
