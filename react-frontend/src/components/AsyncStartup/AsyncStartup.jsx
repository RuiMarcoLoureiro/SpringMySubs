import React, { Fragment } from "react";

import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { useGetPeriodsQuery } from "../../features/periods/periodsApi";
import PiggyAnimation from "../Animations/PiggyAnimation";

const AsyncStartup = ({ children }) => {
    const {
        data: periods,
        isLoading: isLoadingPeriods,
        isFetching: isFetchingPeriods,
        isError: isErrorPeriods,
    } = useGetPeriodsQuery();
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isFetching: isFetchingCategories,
        isError: isErrorCategories,
    } = useGetCategoriesQuery();

    if (
        isLoadingPeriods ||
        isFetchingPeriods ||
        isLoadingCategories ||
        isFetchingCategories
    ) {
        return <PiggyAnimation />;
    }

    if (isErrorPeriods || isErrorCategories) {
        return <div>Something went wrong</div>;
    }

    return <Fragment>{children}</Fragment>;
};

export default AsyncStartup;
