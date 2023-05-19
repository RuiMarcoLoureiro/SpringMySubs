import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { shareSubscriptionPath, subscriptionsPath } from "../../app/constants";
import {
    useDeleteSubscriptionMutation,
    useSubscriptionTotalUsersSubbedQuery,
    useUpdateSubscriptionMutation,
} from "../../features/subscription/subscriptionApi";
import { selectUser } from "../../features/auth/authSelectors";
import PiggyAnimation from "../../components/Animations/PiggyAnimation";
import { selectPeriods } from "../../features/periods/periodsSelector";
import { selectCategories } from "../../features/categories/categoriesSelector";

const validationSchema = yup.object({
    name: yup
        .string("Entrer le nom de l'abonnement")
        .required("Entrer un nom valide"),
    cost: yup
        .string("Entrer le coût de l'abonnement")
        .test("Is positive?", "Le coût doit être positif", (value) => value > 0)
        .required("L'abonnement doit avoir un coût"),
});

const ModifySubscription = () => {
    const navigate = useNavigate();
    const {
        state: { subscription },
    } = useLocation();

    const { id, name, cost, periods_id, categories_id, subscriptions_id } =
        subscription;

    const { id: users_id } = useSelector(selectUser);
    const periods = useSelector(selectPeriods);
    const categories = useSelector(selectCategories);
    const {
        data,
        isLoading: isLoadingTotalUsersSubbed,
        isFetching: isFetchingTotalUsersSubbed,
    } = useSubscriptionTotalUsersSubbedQuery(
        { subscriptions_id },
        { refetchOnMountOrArgChange: true }
    );
    const [updateSubscription, { isLoading: isBeingUpdated }] =
        useUpdateSubscriptionMutation();
    const [deleteSubscription, { isLoading: isBeingDeleted }] =
        useDeleteSubscriptionMutation();

    const deleteSubscriptionHandled = async () => {
        try {
            await deleteSubscription({
                subscriptions_id: id,
                users_id,
            }).unwrap();

            navigate(subscriptionsPath);

            toast.success("Supprimé", {
                position: "top-center",
            });
        } catch (error) {
            console.log("error", error);
            toast.error(error.message || "problème lors de la suppression", {
                position: "top-center",
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            name,
            cost,
            periods_id,
            categories_id,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const { name, cost, periods_id, categories_id } = values;

                const subscription = {
                    id,
                    name,
                    cost,
                    periods_id,
                    categories_id,
                };

                await updateSubscription(subscription).unwrap();

                navigate(subscriptionsPath);

                toast.success("Modifié 😎", {
                    position: "top-center",
                });
            } catch (error) {
                console.log("error", error);
                toast.error(
                    error.message || "problème lors de la modification",
                    {
                        position: "top-center",
                    }
                );
            }
        },
    });

    if (
        isBeingUpdated ||
        isBeingDeleted ||
        isLoadingTotalUsersSubbed ||
        isFetchingTotalUsersSubbed
    ) {
        return <PiggyAnimation />;
    }

    const { total: totalUsersSubbed } = data;

    return (
        <Box m={5}>
            <form component="form" onSubmit={formik.handleSubmit}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Nom"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            id="cost"
                            name="cost"
                            label="Coût"
                            type="number"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        CHF
                                    </InputAdornment>
                                ),
                                // https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
                                enterKeyHint: "done",
                                // close the keyboard on enter
                                onKeyDown: (event) => {
                                    if (event.key === "Enter") {
                                        event.target.blur();
                                    }
                                },
                            }}
                            value={formik.values.cost}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.cost &&
                                Boolean(formik.errors.cost)
                            }
                            helperText={
                                formik.touched.cost && formik.errors.cost
                            }
                            disabled={totalUsersSubbed > 1}
                        />
                        {totalUsersSubbed > 1 && (
                            <Typography variant="caption" color="error">
                                Impossible de modifier le coût une fois partagé
                            </Typography>
                        )}
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">
                            Période
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            fullWidth
                            id="periods_id"
                            name="periods_id"
                            label="Période"
                            value={formik.values.periods_id}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.periods_id &&
                                Boolean(formik.errors.periods_id)
                            }
                            helpertext={
                                formik.touched.periods_id &&
                                formik.errors.periods_id
                            }
                        >
                            {periods &&
                                periods.length &&
                                periods.map((period) => (
                                    <MenuItem value={period.id} key={period.id}>
                                        {period.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </Grid>
                    <Grid item>
                        <InputLabel id="demo-simple-select-label">
                            Catégorie
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            fullWidth
                            id="categories_id"
                            name="categories_id"
                            label="Catégorie"
                            value={formik.values.categories_id}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.categories_id &&
                                Boolean(formik.errors.categories_id)
                            }
                            helpertext={
                                formik.touched.categories_id &&
                                formik.errors.categories_id
                            }
                        >
                            {categories &&
                                categories.length &&
                                categories.map((category) => {
                                    const { id, name } = category;
                                    return (
                                        <MenuItem value={id} key={id}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            // Enable the button if one of the fields is modified
                            disabled={!formik.dirty}
                        >
                            Modifier
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Button
                sx={{ mt: 8 }}
                color="secondary"
                variant="contained"
                fullWidth
                onClick={() =>
                    navigate(shareSubscriptionPath, { state: { subscription } })
                }
            >
                Partager
            </Button>
            <Button
                sx={{ mt: 2 }}
                color="error"
                variant="contained"
                fullWidth
                onClick={deleteSubscriptionHandled}
            >
                Supprimer
            </Button>
        </Box>
    );
};

export default ModifySubscription;
