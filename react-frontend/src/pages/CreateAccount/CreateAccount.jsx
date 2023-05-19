import React from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

import { setUserAction } from "../../features/auth/authSlice";
import { loginPath } from "../../app/constants";
import { useRegisterMutation } from "../../features/auth/authApi";
import PiggyAnimation from "../../components/Animations/PiggyAnimation";

const minPasswordLength = 4;

const validationSchema = yup.object({
    name: yup
        .string("Entrer votre username")
        .required("Le username est requis"),
    password: yup
        .string("Entrer votre mot de passe")
        .min(
            minPasswordLength,
            `Le mot de passe doit contenir au moins ${minPasswordLength} caractères`
        )
        .required("Le mot de passe est requis"),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("password"), null],
            "Le mot de passe doit être identique à celui ci-dessus"
        ),
});

const defaultName = "";
const defaultPassword = "";
const defaultConfirmPassword = "";

const CreateAccount = () => {
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: defaultName,
            password: defaultPassword,
            confirmPassword: defaultConfirmPassword,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const { name, password } = values;

                const result = await register({
                    name,
                    password,
                }).unwrap();

                dispatch(setUserAction(result));
                navigate(loginPath);

                toast.success("Compte créé 👋", {
                    position: "top-center",
                });
            } catch (error) {
                toast.error(error.message || "champs invalides", {
                    position: "top-center",
                });
            }
        },
    });

    if (isLoading) {
        return <PiggyAnimation />;
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
                            label="Nom d'utilisateur"
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
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirmation du mot de passe"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Créer un compte
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Button
                sx={{ mt: 4 }}
                color="secondary"
                variant="contained"
                fullWidth
                onClick={() => navigate(loginPath)}
            >
                Déja un compte ?
            </Button>
        </Box>
    );
};

export default CreateAccount;
