import React from "react";

import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "250px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
