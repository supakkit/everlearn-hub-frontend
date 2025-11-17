import { createTheme } from "@mui/material/styles";
import {  baseThemeOptions } from "./baseTheme";
import { deepmerge } from "@mui/utils";
import { blue } from "@mui/material/colors";

export const darkTheme = createTheme(
  deepmerge(baseThemeOptions, {
    palette: {
      mode: "dark",
      primary: {
        main: blue['A400'],
        contrastText: "white",
      },
    },
  })
);
