import React from "react";

import { useDispatch } from "react-redux";

import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { closeAction } from "../../features/drawer/drawerSlice";
import AppLayoutDrawerContent from "./AppLayoutDrawerContent";
import { drawerWidth } from "./AppLayoutDrawer";

const AppLayoutDrawerMobile = ({ isOpened }) => {
    const dispatch = useDispatch();

    return (
        <MuiDrawer
            variant="temporary"
            open={isOpened}
            onClose={() => dispatch(closeAction())}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                // display on mobile
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                },
            }}
        >
            <Toolbar />
            <AppLayoutDrawerContent isOpened={isOpened} />
            <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={() => dispatch(closeAction())}
            >
                Fermer
            </Button>
        </MuiDrawer>
    );
};

export default AppLayoutDrawerMobile;
