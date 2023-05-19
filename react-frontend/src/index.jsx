// v5 mui requirement
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import store, { persistor } from "./app/store";
import LoadingSpinner from "./components/LoadingSpinner";
import AsyncStartup from "./components/AsyncStartup";
import MuiTheme from "./components/MuiTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
                    <Toaster />
                    <AsyncStartup>
                        <MuiTheme>
                            <App />
                        </MuiTheme>
                    </AsyncStartup>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
