import { Inter } from "next/font/google";
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";
import { green } from "@mui/material/colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
  }
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      light: green[100],
      main: green[700],
      dark: green[900],
      contrastText: "white",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "link" },
          style: {
            background: "none",
            textTransform: "none",
            "&:hover": {
              textDecoration: "underline",
              textUnderlineOffset: 4,
              background: "none",
            },
          },
        },
      ],
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "link" && {
            "& .MuiTouchRipple-root": {
              display: "none",
            },
          }),
        }),
      },
    },
  },
};

export const baseTheme = responsiveFontSizes(createTheme(baseThemeOptions));
