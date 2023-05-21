import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPeriod: {
        id: 3,
        name: "Monthly",
        factor: 30.437,
    },
    filter: {
        categories_id: 1,
        name: "Apprentissage",
    },
    sort: {
        sortColumn: "name",
        sortASC: false,
    },
    theme: {
        mode: "light",
    },
};

const settingsSliceName = "settings";
const settingsSlice = createSlice({
    name: settingsSliceName,
    initialState,
    reducers: {
        setCurrentPeriodAction: (state, action) => {
            const { id, name, factor } = action.payload;
            state.currentPeriod = { id, name, factor };
        },
        setFilterCategoryAction: (state, action) => {
            const { categories_id, name } = action.payload;
            state.filter = { categories_id, name };
        },
        setSortAction: (state, action) => {
            const { sortColumn, sortASC } = action.payload;
            state.sort = { sortColumn, sortASC };
        },
        toggleThemeAction: (state) => {
            state.theme.mode = state.theme.mode === "light" ? "dark" : "light";
        },
    },
});

export const {
    setCurrentPeriodAction,
    setFilterCategoryAction,
    setSortAction,
    toggleThemeAction,
} = settingsSlice.actions;
export default settingsSlice;
