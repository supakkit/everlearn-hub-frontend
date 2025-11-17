"use client";

import { useColorMode } from "@/providers/MuiThemeProvider";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function ModeSwitch() {
  const theme = useTheme();
  const colorMode = useColorMode();

  if (!colorMode) return null;

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
