import React, { useMemo } from "react";

import { useSelector } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { selectTheme } from "../../features/settings/settingsSelector";

const MuiTheme = ({ children }) => {
    const mode = useSelector(selectTheme);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
