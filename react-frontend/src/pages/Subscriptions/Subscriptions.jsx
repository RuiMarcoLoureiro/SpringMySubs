import React, { Fragment, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import SimpleList from "../../components/SimpleList/SimpleList";
import SubscriptionsListItem from "./SubscriptionsListItem";
import {
    StyledFlexHorizontalContainer,
    StyledFlexVerticalContainer,
} from "../../components/Styled";
import { StickyBottom } from "../../components/Sticky";
import SubscriptionsBottomAppBar from "./SubscriptionsBottomAppBar";
import { useSortFilterSubscriptionsQuery } from "../../features/subscription/subscriptionApi";
import PiggyAnimation from "../../components/Animations/PiggyAnimation";
import { selectUser } from "../../features/auth/authSelectors";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
    selectFilterCategory,
    selectSort,
} from "../../features/settings/settingsSelector";

const renderComponent = (item, index) => {
    return <SubscriptionsListItem key={index} subscription={item} />;
};

const defaultCondition = "";

const Subscriptions = () => {
    const dispatch = useDispatch();
    const { id } = useSelector(selectUser);
    const { sortColumn, sortASC } = useSelector(selectSort);
    const { categories_id, name } = useSelector(selectFilterCategory);

    const [condition, setCondition] = useState(defaultCondition);

    const handleConditionChange = useCallback((val) => {
        setCondition(val);
    }, []);

    const { data, isLoading, isFetching } = useSortFilterSubscriptionsQuery(
        {
            id,
            sortColumn,
            sortASC,
            categories_id,
        }, // refetch without cached data
        { refetchOnMountOrArgChange: true }
    );

    if (isLoading || isFetching) {
        return <PiggyAnimation />;
    }

    const filterFunction = () =>
        data.filter((item) =>
            item.name.toLowerCase().includes(condition.toLowerCase())
        );

    return (
        <Fragment>
            <StyledFlexVerticalContainer>
                <Box sx={{ my: 2, mx: 1 }}>
                    <SearchBar onChange={handleConditionChange} />
                </Box>
                <Container>
                    <SimpleList
                        data={data}
                        filterFunction={filterFunction}
                        renderComponent={renderComponent}
                        listSubheader={name}
                    />
                </Container>
            </StyledFlexVerticalContainer>
            <StickyBottom>
                <SubscriptionsBottomAppBar />
            </StickyBottom>
        </Fragment>
    );
};

export default Subscriptions;
