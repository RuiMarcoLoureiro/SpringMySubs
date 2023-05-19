import React from "react";

import Container from "@mui/material/Container";

import { StyledFlexVerticalContainer } from "../../components/Styled";
import ShareSubscriptionList from "./ShareSubscriptionList";

const ShareSubscription = () => {
    return (
        <StyledFlexVerticalContainer>
            <Container>
                <ShareSubscriptionList />
            </Container>
        </StyledFlexVerticalContainer>
    );
};

export default ShareSubscription;
