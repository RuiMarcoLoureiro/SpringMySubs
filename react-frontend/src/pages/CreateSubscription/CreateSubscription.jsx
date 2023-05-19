import React from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

import { subscriptionsPath } from "../../app/constants";
import { useAddSubscriptionMutation } from "../../features/subscription/subscriptionApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { selectUser } from "../../features/auth/authSelectors";
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

const defaultName = "";
const defaultCost = 0;
const defaultPeriod = 3;
const defaultCategory = 1;
const defaultAccepted = true;

const CreateSubscription = () => {
    const { id } = useSelector(selectUser);
    const periods = useSelector(selectPeriods);
    const [addSubscription, { isLoading: isSubscriptionBeingAdded }] =
        useAddSubscriptionMutation();
    const categories = useSelector(selectCategories);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: defaultName,
            cost: defaultCost,
            periods_id: defaultPeriod,
            categories_id: defaultCategory,
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
                    accepted: defaultAccepted,
                };

                await addSubscription(subscription).unwrap();

                navigate(subscriptionsPath);

                toast.success("Ajouté 😎", {
                    position: "top-center",
                });
            } catch (error) {
                console.log("error", error);
                toast.error(error.message || "problème lors de la sauvegarde", {
                    position: "top-center",
                });
            }
        },
    });

    if (isSubscriptionBeingAdded) {
        return <LoadingSpinner />;
    }

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
                        />
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
                        >
                            Créer
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateSubscription;
