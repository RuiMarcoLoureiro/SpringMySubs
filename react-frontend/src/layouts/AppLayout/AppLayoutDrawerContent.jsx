import React from "react";

import { useDispatch } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { Brightness4 as Brightness4Icon } from "@mui/icons-material";
import { Brightness7 as Brightness7Icon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { toggleIsOpenedAction } from "../../features/drawer/drawerSlice";
import { signoutAction } from "../../features/auth/authSlice";
import { toggleThemeAction } from "../../features/settings/settingsSlice";

const AppLayoutDrawerContent = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <List sx={{ flexGrow: 1 }}>
            <ListItem key="ToggleTheme" disablePadding>
                <ListItemButton
                    onClick={() => {
                        dispatch(toggleIsOpenedAction());
                        dispatch(toggleThemeAction());
                    }}
                >
                    <ListItemIcon>
                        {theme.palette.mode === "dark" ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </ListItemIcon>
                    <ListItemText primary={`${theme.palette.mode} mode`} />
                </ListItemButton>
            </ListItem>
            <ListItem key="Déconnexion" disablePadding>
                <ListItemButton
                    onClick={() => {
                        dispatch(toggleIsOpenedAction());
                        dispatch(signoutAction());
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AppLayoutDrawerContent;
