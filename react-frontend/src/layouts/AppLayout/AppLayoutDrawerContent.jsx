import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { Brightness4 as Brightness4Icon } from "@mui/icons-material";
import { Brightness7 as Brightness7Icon } from "@mui/icons-material";
import { PriceChange as PriceChangeIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { priceDemandPath } from "../../app/constants";

import { toggleIsOpenedAction } from "../../features/drawer/drawerSlice";
import { signoutAction } from "../../features/auth/authSlice";
import { toggleThemeAction } from "../../features/settings/settingsSlice";

const AppLayoutDrawerContent = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();

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
			<ListItem key="Demande de prix" disablePadding>
				<ListItemButton
					onClick={() => {
						dispatch(toggleIsOpenedAction());
						navigate(priceDemandPath);
					}}
				>
					<ListItemIcon>
						<PriceChangeIcon />
					</ListItemIcon>
					<ListItemText primary="Demande de prix" />
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
