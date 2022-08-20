import { render } from "@testing-library/react";
import React from "react";
import { userContext } from "./App";
import { useContext } from "react";
import { Box, Typography } from "@mui/material";

export default function Profile() {

    const {user} = useContext(userContext);

    render(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography>user</Typography>
        </Box>
    );
}