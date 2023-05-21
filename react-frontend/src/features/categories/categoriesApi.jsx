/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { apiBaseUrl } from "../../app/constants";

const categoriesApiName = "categoriesApi";
const categoriesApi = createApi({
    reducerPath: categoriesApiName,
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
        // prepareHeaders: (headers, { getState }) => {
        //     const { token } = getState().auth.user;
        //     if (token) {
        //         headers.set("authorization", `Bearer ${token}`);
        //     }
        //     return headers;
        // }
    }),
    endpoints: (builder) => ({
        // Query endpoints: They are endpoints for requests that retrieve data.
        // Meaning for reading data from the server, we use queries.
        getCategories: builder.query({
            query: () => ({
                url: "category/",
                method: "GET",
            }),
        }),
        // Mutation endpoints:
        // As opposed to queries, mutations endpoints are used for creating, updating, and deleting data.
    }),
});

export { categoriesApi };
export const { useGetCategoriesQuery } = categoriesApi;
