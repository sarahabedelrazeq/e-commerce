import React from "react";
import { Container as MaterialContainer } from "@mui/material";

export default function Container({ children, ...props }) {
  return (
    <MaterialContainer
      {...props}
      sx={{
        ...props.xs,
        width: { xs: "100%", sm: 540, md: 720, lg: 960, xl: 1140, xxl: 1320 },
        minWidth: { xs: "100%", sm: 540, md: 720, lg: 960, xl: 1140, xxl: 1320 },
        maxWidth: { xs: "100%", sm: 540, md: 720, lg: 960, xl: 1140, xxl: 1320 },
      }}
    >
      {children}
    </MaterialContainer>
  );
}
