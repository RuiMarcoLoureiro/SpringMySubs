import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectIsAuthenticated } from "../features/auth/authSelectors";
import { loginPath } from "../app/constants";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    let location = useLocation();

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={loginPath} state={{ from: location }} replace />;
    } else {
        return children;
    }
};

export default ProtectedRoute;
