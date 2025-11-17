import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { baseThemeOptions } from "./baseTheme";
import { deepmerge } from "@mui/utils";
import { blue, green, grey } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#c51162',
    },
    background: {
      default: '#292929',
      paper: '#002884',
    },
  },
};

export const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(baseThemeOptions, darkThemeOptions))
);

