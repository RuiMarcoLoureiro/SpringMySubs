import React, { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { modifySubscriptionPath } from "../../app/constants";
import { selectPeriods } from "../../features/periods/periodsSelector";

const SubscriptionsListItem = ({ subscription }) => {
    const { id, name, cost, periods_id, categories_id } = subscription;
    const periods = useSelector(selectPeriods);
    const navigate = useNavigate();

    const periodName = periods.find((period) => period.id === periods_id).name;

    return (
        <ListItem
            key={id}
            sx={{ my: 2, py: 2, border: 1, borderRadius: 1 }}
            secondaryAction={
                <Fragment>
                    <IconButton edge="end" aria-label="price">
                        {`${cost} CHF`}
                    </IconButton>
                    <Typography
                        sx={{
                            ml: 1,
                            verticalAlign: "middle",
                            textAlign: "right",
                            //display: "inline",
                        }}
                        edge="end"
                    >
                        {periodName}
                    </Typography>
                </Fragment>
            }
            disablePadding
        >
            <ListItemButton
                onClick={() =>
                    navigate(modifySubscriptionPath, {
                        state: { subscription },
                    })
                }
            >
                <ListItemText id={id} primary={name} />
            </ListItemButton>
        </ListItem>
    );
};

export default SubscriptionsListItem;
