import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { selectIsOpened } from "../../features/drawer/drawerSelectors";
import { toggleIsOpenedAction } from "../../features/drawer/drawerSlice";
import { APP_NAME, subscriptionsPath } from "../../app/constants";
import logo from "./../../ressources/icon.png";

const AppBarMobile = styled(MuiAppBar)(({ theme }) => ({
    // background: theme.palette.primary.dark,
    //color: theme.palette.primary.contrastText,
    zIndex: theme.zIndex.drawer + 1,
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
    flexGrow: 1,
}));

const AppLayoutHeaderMobile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isOpened = useSelector(selectIsOpened);
    return (
        <AppBarMobile
            position="fixed"
            open={isOpened}
            sx={{
                // display on mobile
                display: { xs: "block", sm: "none" },
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                        dispatch(toggleIsOpenedAction());
                    }}
                    edge="start"
                >
                    {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                <Stack
                    direction="row"
                    spacing={1}
                    onClick={() => navigate(subscriptionsPath)}
                >
                    <Typography component="div" variant="h6">
                        {APP_NAME}
                    </Typography>
                    <img src={logo} alt="logo" style={{ height: "30px" }} />
                </Stack>
                <Box></Box>
            </Toolbar>
        </AppBarMobile>
    );
};

export default AppLayoutHeaderMobile;
