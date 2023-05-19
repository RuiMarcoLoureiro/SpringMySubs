import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import SubscriptionsBottomAppBarMenu from "./SubscriptionsBottomAppBarMenu";
import { createSubscriptionPath } from "../../app/constants";
import { selectAmount } from "../../features/subscription/subscriptionSelector";
import SubscriptionsBottomAppBarSort from "./SubscriptionsBottomAppBarSort";
import SubscriptionsBottomAppBarFilter from "./SubscriptionsBottomAppBarFilter";
import { selectCurrentPeriod } from "../../features/settings/settingsSelector";

const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
});

const height = "80px";

const SubscriptionsBottomAppBar = () => {
    const navigate = useNavigate();
    const amount = useSelector(selectAmount);
    const { factor } = useSelector(selectCurrentPeriod);

    return (
        <AppBar color="primary" sx={{ position: "sticky" }}>
            <Toolbar sx={{ height: height }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignContent="center"
                >
                    <SubscriptionsBottomAppBarMenu />
                    <Typography>
                        {Math.round(amount * factor * 100) / 100} CHF
                    </Typography>
                </Stack>
                <StyledFab
                    color="secondary"
                    aria-label="add"
                    onClick={() => navigate(createSubscriptionPath)}
                >
                    <AddIcon />
                </StyledFab>
                <Box sx={{ flexGrow: 1 }} />
                <SubscriptionsBottomAppBarFilter />
                <SubscriptionsBottomAppBarSort />
            </Toolbar>
        </AppBar>
    );
};

export default SubscriptionsBottomAppBar;
