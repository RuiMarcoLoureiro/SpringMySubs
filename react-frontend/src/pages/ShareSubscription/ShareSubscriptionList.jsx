import React from "react";

import { useLocation } from "react-router-dom";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";

import ShareSubscriptionListContent from "./ShareSubscriptionListContent";
import PiggyAnimation from "../../components/Animations/PiggyAnimation";
import {
    useSubscriptionUsersNotSubbedQuery,
    useSubscriptionUsersSubbedQuery,
} from "../../features/subscription/subscriptionApi";

const ShareSubscriptionList = () => {
    const {
        state: { subscription },
    } = useLocation();
    const { name, subscriptions_id } = subscription;

    const {
        data: usersSubbed,
        isLoading: isLoadingUsersSubbed,
        isFetching: isFetchingUsersSubbed,
    } = useSubscriptionUsersSubbedQuery(
        { subscriptions_id },
        { refetchOnMountOrArgChange: true }
    );

    const {
        data: usersNotSubbed,
        isLoading: isLoadingUsersNotSubbed,
        isFetching: isFetchingUsersNotSubbed,
    } = useSubscriptionUsersNotSubbedQuery(
        { subscriptions_id },
        { refetchOnMountOrArgChange: true }
    );

    if (
        isLoadingUsersSubbed ||
        isFetchingUsersSubbed ||
        isLoadingUsersNotSubbed ||
        isFetchingUsersNotSubbed
    ) {
        return <PiggyAnimation />;
    }

    return (
        <List
            sx={{ mt: 2 }}
            dense={true}
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    <Typography variant="h6" sx={{ my: 2 }}>
                        {name.toUpperCase()}
                    </Typography>
                </ListSubheader>
            }
        >
            <ShareSubscriptionListContent
                subscription={subscription}
                usersSubbed={usersSubbed}
                usersNotSubbed={usersNotSubbed}
            />
        </List>
    );
};

export default ShareSubscriptionList;
