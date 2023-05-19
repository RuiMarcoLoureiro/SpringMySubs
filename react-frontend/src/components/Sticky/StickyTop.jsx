import React from "react";

import StickyBox from "react-sticky-box";

//import { useTheme } from "@mui/material";

const StickyTop = ({ children, offsetTop }) => {
    //const theme = useTheme();
    return (
        <StickyBox
            offsetTop={offsetTop}
            style={{
                backgroundColor: "white",
                //zIndex: theme.zIndex.appBar,
            }}
        >
            {children}
        </StickyBox>
    );
};

export default StickyTop;
