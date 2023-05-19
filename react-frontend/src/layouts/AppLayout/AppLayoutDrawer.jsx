import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import { selectIsOpened } from "../../features/drawer/drawerSelectors";
import AppLayoutDrawerMobile from "./AppLayoutDrawerMobile";
import AppLayoutDrawerDesktop from "./AppLayoutDrawerDesktop";
import AppLayoutHeader from "./AppLayoutHeader";
import {
    StyledFlexHorizontalContainer,
    StyledFlexVerticalContainer,
} from "../../components/Styled";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";
import AppLayoutHeaderUnauthenticated from "./AppLayoutHeaderUnauthenticated";

const drawerWidth = 240;

const AppLayoutDrawer = () => {
    const isOpened = useSelector(selectIsOpened);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <StyledFlexHorizontalContainer>
            {/* Don't render the drawer if the user is not authenticated */}
            {isAuthenticated ? (
                <Fragment>
                    <CssBaseline />
                    <AppLayoutHeader />
                    <Box
                        component="nav"
                        sx={{
                            width: { sm: drawerWidth },
                            flexShrink: { sm: 0 },
                        }}
                        aria-label="drawer"
                    >
                        <AppLayoutDrawerMobile isOpened={isOpened} />
                        <AppLayoutDrawerDesktop isOpened={isOpened} />
                    </Box>
                </Fragment>
            ) : (
                <Fragment>
                    <CssBaseline />
                    <AppLayoutHeaderUnauthenticated />
                </Fragment>
            )}

            <StyledFlexVerticalContainer>
                <Toolbar />
                <StyledFlexVerticalContainer>
                    <Outlet />
                </StyledFlexVerticalContainer>
            </StyledFlexVerticalContainer>
        </StyledFlexHorizontalContainer>
    );
};

export { drawerWidth };
export default AppLayoutDrawer;
