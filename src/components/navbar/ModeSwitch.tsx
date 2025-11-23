"use client";

import { useColorMode } from "@/providers/MuiThemeProvider";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';




export function ModeSwitch() {
  const theme = useTheme();
  const colorMode = useColorMode();

  if (!colorMode) return null;

  return (
    <IconButton title="toggle theme" onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <WbSunnyRoundedIcon /> : <BedtimeRoundedIcon />}
    </IconButton>
  );
}



