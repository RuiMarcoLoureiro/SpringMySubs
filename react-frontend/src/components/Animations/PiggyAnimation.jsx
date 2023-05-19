import React from "react";

import Lottie from "lottie-react";

import piggy from "./../../ressources/piggy-coins.json";

const PiggyAnimation = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Lottie
                animationData={piggy}
                loop={true}
                style={{
                    maxWidth: "500px",
                }}
            />
        </div>
    );
};

export default PiggyAnimation;
