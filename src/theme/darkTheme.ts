import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { baseThemeOptions } from "./baseTheme";
import { deepmerge } from "@mui/utils";
import { ThemeOptions } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: '#283593',
      contrastText: grey[50],
    },
    secondary: {
      main: '#c51162',
    },
    background: {
      default: '#292929',
    },
  },
};

export const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(baseThemeOptions, darkThemeOptions))
);

