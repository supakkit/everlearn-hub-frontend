import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { baseThemeOptions } from "./baseTheme";
import { deepmerge } from "@mui/utils";
import { blue } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: blue["A400"],
      contrastText: "white",
    },
    background: {
      default: "#292929",
    },
  },
};

export const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(baseThemeOptions, darkThemeOptions))
);
