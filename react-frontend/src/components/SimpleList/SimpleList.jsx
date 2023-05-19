import React from "react";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

import { StyledFlexVerticalContainer } from "../Styled";

const SimpleList = ({
    data,
    renderComponent,
    filterFunction,
    listSubheader,
}) => {
    const filteredData = filterFunction ? filterFunction() : data;

    return (
        <StyledFlexVerticalContainer>
            {filteredData && filteredData.length ? (
                <List
                    dense={true}
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            <Typography variant="h6">
                                {listSubheader.toUpperCase()}
                            </Typography>
                        </ListSubheader>
                    }
                >
                    {filteredData.map(renderComponent)}
                </List>
            ) : (
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Aucun élément dans la catégorie sélectionnée
                </Typography>
            )}
        </StyledFlexVerticalContainer>
    );
};

export default SimpleList;
