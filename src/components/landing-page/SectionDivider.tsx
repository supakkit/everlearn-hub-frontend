"use client";

import { Box } from "@mui/material";

export const SectionDivider: React.FC = () => {
  return (
    <Box
      sx={{
        background: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
        height: 6,
        width: 400,
        borderRadius: 3,
        marginX: "auto",
        marginY: 5,
      }}
    />
  );
};
