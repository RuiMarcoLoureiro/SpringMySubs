import React from "react";

import StickyBox from "react-sticky-box";

const StickyBottom = ({ children, offsetBottom = 0 }) => {
    return (
        <StickyBox
            bottom={true}
            offsetBottom={offsetBottom}
            style={{ justifySelf: "flex-end" }}
        >
            {children}
        </StickyBox>
    );
};

export default StickyBottom;
