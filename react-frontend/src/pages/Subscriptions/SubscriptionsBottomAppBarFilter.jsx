import React, { useState, useRef, useEffect, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import { FilterAlt as FilterAltIcon } from "@mui/icons-material";

import { setFilterCategoryAction } from "../../features/settings/settingsSlice";
import { selectFilterCategory } from "../../features/settings/settingsSelector";
import { selectCategories } from "../../features/categories/categoriesSelector";

const SubscriptionsBottomAppBarFilter = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const filterCategory = useSelector(selectFilterCategory);
    const categories = useSelector(selectCategories);

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
                <FilterAltIcon sx={{ mr: 2 }} />
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
                                    {categories.map((row) => {
                                        const { id, name } = row;
                                        return (
                                            <MenuItem
                                                onClick={(event) => {
                                                    dispatch(
                                                        setFilterCategoryAction(
                                                            {
                                                                categories_id:
                                                                    id,
                                                                name,
                                                            }
                                                        )
                                                    );
                                                    handleClose(event);
                                                }}
                                                key={id}
                                                selected={
                                                    filterCategory.categories_id ===
                                                    id
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {name}
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

export default SubscriptionsBottomAppBarFilter;
