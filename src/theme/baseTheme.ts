import { Inter } from "next/font/google";
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";
import { blue, deepPurple, green, grey, indigo, purple } from "@mui/material/colors";

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
    primary: indigo,
    secondary: {
      main: '#e91e63',
    },
    background: {
      paper: grey['A100'],
    },
  },
  shape: {
    borderRadius: 12,
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
