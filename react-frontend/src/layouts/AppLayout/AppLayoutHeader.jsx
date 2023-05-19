import React, { Fragment } from "react";

import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import AppLayoutHeaderMobile from "./AppLayoutHeaderMobile";
import AppLayoutHeaderDesktop from "./AppLayoutHeaderDesktop";

const useAppBarHeight = () => {
    const {
        mixins: { toolbar },
        breakpoints,
    } = useTheme();

    const toolbarDesktopQuery = breakpoints.up("sm");
    const toolbarLandscapeQuery = `${breakpoints.up(
        "xs"
    )} and (orientation: landscape)`;

    const isDesktop = useMediaQuery(toolbarDesktopQuery);
    const isLandscape = useMediaQuery(toolbarLandscapeQuery);

    let currentToolbarMinHeight;

    if (isDesktop) {
        currentToolbarMinHeight = toolbar[toolbarDesktopQuery];
    } else if (isLandscape) {
        currentToolbarMinHeight = toolbar[toolbarLandscapeQuery];
    } else {
        currentToolbarMinHeight = toolbar;
    }

    return currentToolbarMinHeight?.minHeight || 0;
};

const AppLayoutHeader = () => {
    return (
        <Fragment>
            <AppLayoutHeaderMobile />
            <AppLayoutHeaderDesktop />
        </Fragment>
    );
};

export { useAppBarHeight };
export default AppLayoutHeader;
