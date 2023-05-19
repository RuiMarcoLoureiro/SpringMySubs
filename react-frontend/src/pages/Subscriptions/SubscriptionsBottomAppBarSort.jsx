import React, { useState, useRef, useEffect, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import {
    Sort as SortIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    ExpandCircleDownOutlined as ExpandCircleDownOutlinedIcon,
} from "@mui/icons-material";
import { setSortAction } from "../../features/settings/settingsSlice";
import { selectSort } from "../../features/settings/settingsSelector";

const rows = [
    {
        key: 1,
        label: "Nom",
        sortColumn: "name",
    },
    {
        key: 2,
        label: "Coût",
        sortColumn: "cost",
    },
];

const SubscriptionsBottomAppBarSort = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const { sortColumn: currentSortColumn, sortASC: currentSortASC } =
        useSelector(selectSort);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Fragment>
            <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <SortIcon />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 2000 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom-start"
                                    ? "left top"
                                    : "left bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {rows.map((row) => {
                                        const { key, label, sortColumn } = row;
                                        return (
                                            <MenuItem
                                                onClick={handleClose}
                                                key={key}
                                            >
                                                {label}
                                                <IconButton
                                                    sx={{ ml: 2 }}
                                                    onClick={() =>
                                                        dispatch(
                                                            setSortAction({
                                                                sortColumn,
                                                                sortASC: true,
                                                            })
                                                        )
                                                    }
                                                >
                                                    {currentSortColumn ===
                                                        sortColumn &&
                                                    currentSortASC ? (
                                                        <ExpandCircleDownOutlinedIcon />
                                                    ) : (
                                                        <KeyboardArrowDownIcon />
                                                    )}
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(
                                                            setSortAction({
                                                                sortColumn,
                                                                sortASC: false,
                                                            })
                                                        )
                                                    }
                                                >
                                                    {currentSortColumn ===
                                                        sortColumn &&
                                                    !currentSortASC ? (
                                                        <ExpandCircleDownOutlinedIcon
                                                            sx={{
                                                                transform:
                                                                    "rotate(180deg)",
                                                            }}
                                                        />
                                                    ) : (
                                                        <KeyboardArrowUpIcon />
                                                    )}
                                                </IconButton>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    );
};

export default SubscriptionsBottomAppBarSort;
