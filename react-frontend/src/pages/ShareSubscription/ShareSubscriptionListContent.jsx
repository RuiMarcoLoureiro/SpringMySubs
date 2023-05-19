import React, { Fragment } from "react";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { Add as AddIcon } from "@mui/icons-material";
import { Close as CloseIcon } from "@mui/icons-material";

import {
    useDeleteSubscriptionMutation,
    useShareSubscriptionMutation,
} from "../../features/subscription/subscriptionApi";
import { selectUser } from "../../features/auth/authSelectors";
import PiggyAnimation from "../../components/Animations/PiggyAnimation";

const ShareSubscriptionListContent = ({
    usersSubbed,
    usersNotSubbed,
    subscription,
}) => {
    const { subscriptions_id } = subscription;

    const { id: currentUserId } = useSelector(selectUser);

    const [shareSubscription, { isLoading: isSubscriptionBeingShared }] =
        useShareSubscriptionMutation();
    const [deleteSubscription, { isLoading: isSubscriptionBeingDeleted }] =
        useDeleteSubscriptionMutation();

    const handleShareSubscription = async ({ users_id, name }) => {
        try {
            await shareSubscription({
                subscriptions_id,
                users_id,
            }).unwrap();

            toast.success(`Partagé avec ${name} 👍`, {
                position: "top-center",
            });
        } catch (error) {
            console.log("error", error);
            toast.error(error.message || "problème lors du partage", {
                position: "top-center",
            });
        }
    };

    const handleDeleteSubscription = async ({ users_id, name }) => {
        try {
            await deleteSubscription({
                subscriptions_id,
                users_id,
            }).unwrap();

            toast.success(`Partage avec ${name} supprimé 👍`, {
                position: "top-center",
            });
        } catch (error) {
            console.log("error", error);
            toast.error(
                error.message || "problème lors de la suppression du partage",
                {
                    position: "top-center",
                }
            );
        }
    };

    if (isSubscriptionBeingShared || isSubscriptionBeingDeleted) {
        return <PiggyAnimation />;
    }

    return (
        <Fragment>
            <Divider light textAlign="center">
                <Chip label="Abonnés" />
            </Divider>
            {usersSubbed.map((user) => {
                const { id, users_id, name } = user;
                return (
                    <ListItem
                        key={id}
                        sx={{
                            my: 2,
                            py: 2,
                            border: 1,
                            borderRadius: 1,
                            padding: "16px",
                        }}
                        disablePadding
                        secondaryAction={
                            users_id !== currentUserId && (
                                <IconButton
                                    edge="end"
                                    aria-label="add"
                                    onClick={() => {
                                        handleDeleteSubscription({
                                            users_id,
                                            name,
                                        });
                                    }}
                                >
                                    <CloseIcon sx={{ color: "red" }} />
                                </IconButton>
                            )
                        }
                    >
                        <ListItemText primary={name} />
                    </ListItem>
                );
            })}

            <Divider light textAlign="center">
                <Chip label="Non abonnés" />
            </Divider>
            {usersNotSubbed.map((user) => {
                const { id, name } = user;
                return (
                    <ListItem
                        key={id}
                        sx={{
                            my: 2,
                            py: 2,
                            border: 1,
                            borderRadius: 1,
                            padding: "16px",
                        }}
                        disablePadding
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="add"
                                onClick={() => {
                                    handleShareSubscription({
                                        users_id: id,
                                        name,
                                    });
                                }}
                            >
                                <AddIcon sx={{ color: "green" }} />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={name} />
                    </ListItem>
                );
            })}
        </Fragment>
    );
};

export default ShareSubscriptionListContent;
