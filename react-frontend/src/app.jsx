import { Routes, Route, Outlet } from "react-router-dom";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";

// Layouts
import AppLayout from "./layouts/AppLayout";

// Pages
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import CreateSubscription from "./pages/CreateSubscription";
import ModifySubscription from "./pages/ModifySubscription/ModifySubscription";
import ShareSubscription from "./pages/ShareSubscription";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Login />} />
                <Route path="app">
                    {/* Public pages */}
                    <Route path="login" element={<Login />} />
                    <Route path="createAccount" element={<CreateAccount />} />

                    <Route
                        path="protected"
                        element={
                            <ProtectedRoute>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        {/* Protected pages */}
                        <Route path="subscriptions">
                            <Route index element={<Subscriptions />} />
                            <Route
                                path="create"
                                element={<CreateSubscription />}
                            />
                            <Route
                                path="modify"
                                element={<ModifySubscription />}
                            />
                            <Route
                                path="share"
                                element={<ShareSubscription />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
