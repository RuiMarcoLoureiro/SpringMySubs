import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// features
import { authApi } from "../features/auth/authApi";
import { subscriptionApi } from "../features/subscription/subscriptionApi";
import { categoriesApi } from "../features/categories/categoriesApi";
import { periodsApi } from "../features/periods/periodsApi";
import authSlice from "../features/auth/authSlice";
import drawerSlice from "../features/drawer/drawerSlice";
import subscriptionSlice from "../features/subscription/subscriptionSlice";
import settingsSlice from "../features/settings/settingsSlice";
import periodsSlice from "../features/periods/periodsSlice";
import categoriesSlice from "../features/categories/categoriesSlice";

const rootReducer = combineReducers({
    // add API'S here ⚠️
    [authApi.reducerPath]: authApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [periodsApi.reducerPath]: periodsApi.reducer,
    // add REDUCER'S here ⚠️
    [authSlice.name]: authSlice.reducer,
    [drawerSlice.name]: drawerSlice.reducer,
    [subscriptionSlice.name]: subscriptionSlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,
    [periodsSlice.name]: periodsSlice.reducer,
    [categoriesSlice.name]: categoriesSlice.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    // all apis shouldn't be persisted --> avoid phantom state and subscriptions
    whitelist: [authSlice.name, settingsSlice.name], // here add reducers that should be persisted ⚠️
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(
            // Adding the api middleware enables caching, invalidation, polling,
            // and other useful features of `rtk-query`.
            // Here don't forget to add API'S ⚠️
            authApi.middleware,
            subscriptionApi.middleware,
            categoriesApi.middleware,
            periodsApi.middleware
        ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

let persistor = persistStore(store);

// persistor.purge();

export { persistor };
export default store;
