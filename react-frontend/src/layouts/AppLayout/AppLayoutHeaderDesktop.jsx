import React from "react";

import { useNavigate } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { drawerWidth } from "./AppLayoutDrawer";
import { APP_NAME, subscriptionsPath } from "../../app/constants";
import logo from "./../../ressources/icon.png";

const AppBarDesktop = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    // color: theme.palette.primary.contrastText,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
    flexGrow: 1,
}));

const AppLayoutHeaderDesktop = () => {
    const navigate = useNavigate();

    return (
        <AppBarDesktop
            position="fixed"
            sx={{
                // display on desktop
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                },
            }}
            open={true}
        >
            <Toolbar sx={{ justifyContent: "center" }}>
                <Stack
                    direction="row"
                    spacing={1}
                    onClick={() => navigate(subscriptionsPath)}
                >
                    <Typography variant="h6">{APP_NAME}</Typography>
                    <img src={logo} alt="logo" style={{ height: "30px" }} />
                </Stack>
            </Toolbar>
        </AppBarDesktop>
    );
};

export default AppLayoutHeaderDesktop;
