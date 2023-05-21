export const APP_NAME = "Show My Subs";

const domain = "localhost";

// API ROUTES
export const apiBaseUrl = `http://${domain}:9090/api/v1`;

// NAVIGATION ROUTES
export const appPath = "/app";
export const loginPath = `${appPath}/login`;
export const createAccountPath = `${appPath}/createAccount`;
export const protectedPath = `${appPath}/protected`;
export const subscriptionsPath = `${protectedPath}/subscriptions`;
export const createSubscriptionPath = `${subscriptionsPath}/create`;
export const modifySubscriptionPath = `${subscriptionsPath}/modify`;
export const shareSubscriptionPath = `${subscriptionsPath}/share`;
export const priceDemandPath = `${subscriptionsPath}/priceDemand`;
