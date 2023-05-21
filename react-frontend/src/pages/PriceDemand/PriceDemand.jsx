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
import { useAskPriceMutation } from "../../features/subscription/subscriptionApi";
import LoadingSpinner from "../../components/LoadingSpinner";

const validationSchema = yup.object({
	subscription_id: yup.number().required("Champ requis"),
});

const defaultSubscription = 1;

const CreateSubscription = () => {
	const subscriptions = [
		{ id: 1, name: "NETFLIX" },
		{ id: 2, name: "SPOTIFY" },
		{ id: 3, name: "DISNEY" },
	];

	const navigate = useNavigate();
	const [askPrice, { isLoading }] = useAskPriceMutation();

	const formik = useFormik({
		initialValues: {
			subscription_id: defaultSubscription,
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const { subscription_id } = values;

				const subscription_name = subscriptions.find(
					(category) => category.id === subscription_id
				).name;

				await askPrice({ subscription_name }).unwrap();

				navigate(subscriptionsPath);

				toast.success("Demande faite 👍", {
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

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<Box m={5}>
			<form component="form" onSubmit={formik.handleSubmit}>
				<Grid container direction={"column"} spacing={2}>
					<Grid item>
						<InputLabel id="demo-simple-select-label">
							Catégorie
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							fullWidth
							id="subscription_id"
							name="subscription_id"
							label="Abonnement"
							value={formik.values.subscription_id}
							onChange={formik.handleChange}
							error={
								formik.touched.subscription_id &&
								Boolean(formik.errors.subscription_id)
							}
							helpertext={
								formik.touched.subscription_id &&
								formik.errors.subscription_id
							}
						>
							{subscriptions &&
								subscriptions.length &&
								subscriptions.map((subscription) => {
									const { id, name } = subscription;
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
							Demander
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default CreateSubscription;
