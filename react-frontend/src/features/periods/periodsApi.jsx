/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { apiBaseUrl } from "../../app/constants";

const periodsApiName = "periodsApi";
const periodsApi = createApi({
    reducerPath: periodsApiName,
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
        getPeriods: builder.query({
            query: () => ({
                url: "period/",
                method: "GET",
            }),
            // Transform and normalize API response
            transformResponse: (response) => {
                return response.map((row) => {
                    const { id, name } = row;
                    switch (name) {
                        case "Weekly":
                            return { ...row, factor: 7 };
                        case "Monthly":
                            return { ...row, factor: 30.437 };
                        case "Yearly":
                            return { ...row, factor: 365.2422 };
                        default:
                            return { ...row, factor: 1 };
                    }
                });
            },
        }),
        // Mutation endpoints:
        // As opposed to queries, mutations endpoints are used for creating, updating, and deleting data.
    }),
});

export { periodsApi };
export const { useGetPeriodsQuery } = periodsApi;
