import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUserAction } from "../../features/auth/authSlice";
import { createAccountPath, subscriptionsPath } from "../../app/constants";
import { useLoginMutation } from "../../features/auth/authApi";
import PiggyAnimation from "../../components/Animations/PiggyAnimation";

const validationSchema = yup.object({
    name: yup
        .string("Entrer votre nom d'utilisateur")
        .required("Le nom d'utilisateur est requis"),
    password: yup
        .string("Entrer votre mot de passe")
        .required("Le mot de passe est requis"),
});

const defaultName = "";
const defaultPassword = "";

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: defaultName,
            password: defaultPassword,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const { name, password } = values;
                const response = await login({
                    name,
                    password,
                }).unwrap();

                const { accessToken : token } = response;

                dispatch(setUserAction({ name, token }));
                navigate(subscriptionsPath);

                toast.success(`Bienvenue ${name}👋`, {
                    position: "top-center",
                });
            } catch (error) {
                toast.error(error.message || "identifiants invalides", {
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
                            label="Username"
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
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Se connecter
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Button
                sx={{ mt: 4 }}
                color="secondary"
                variant="contained"
                fullWidth
                onClick={() => navigate(createAccountPath)}
            >
                Créer un compte
            </Button>
        </Box>
    );
};

export default Login;
