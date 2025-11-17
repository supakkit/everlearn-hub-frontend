import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { baseThemeOptions } from "./baseTheme";
import { deepmerge } from "@mui/utils";
import { blue, green } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: green[700],
      contrastText: "white",
    },
    background: {
      default: "#363636",
      paper: "#121212",
    },
  },
};

export const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(baseThemeOptions, darkThemeOptions))
);
