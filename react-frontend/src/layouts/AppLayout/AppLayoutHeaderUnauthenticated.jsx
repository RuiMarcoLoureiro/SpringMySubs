import React from "react";

import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { APP_NAME } from "../../app/constants";
import logo from "./../../ressources/icon.png";

const AppLayoutHeaderUnauthenticated = () => {
    return (
        <AppBar position="fixed" open={true}>
            <Toolbar sx={{ justifyContent: "center" }}>
                <Stack direction="row" spacing={1}>
                    <Typography variant="h6">{APP_NAME}</Typography>
                    <img src={logo} alt="logo" style={{ height: "30px" }} />
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default AppLayoutHeaderUnauthenticated;
