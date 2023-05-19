import React, { useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { setCurrentPeriodAction } from "../../features/settings/settingsSlice";
import { selectCurrentPeriod } from "../../features/settings/settingsSelector";
import { useGetPeriodsQuery } from "../../features/periods/periodsApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { selectPeriods } from "../../features/periods/periodsSelector";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const SubscriptionsBottomAppBarMenu = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(selectCurrentPeriod);
    const periods = useSelector(selectPeriods);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                //variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ pl: 0 }}
                color="inherit"
            >
                {name}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {periods &&
                    periods.length &&
                    periods.map((period) => {
                        const { id, name } = period;
                        return (
                            <MenuItem
                                value={id}
                                key={id}
                                onClick={(event) => {
                                    dispatch(setCurrentPeriodAction(period));
                                    handleClose(event);
                                }}
                                disableRipple
                            >
                                {name}
                            </MenuItem>
                        );
                    })}
            </StyledMenu>
        </Fragment>
    );
};

export default SubscriptionsBottomAppBarMenu;
