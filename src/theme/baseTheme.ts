import { Inter } from "next/font/google";
import {
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { grey, indigo } from "@mui/material/colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
    outlinedDarkMode: true;
  }
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const baseComponentsOptions: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        variants: [
          {
            props: { variant: "link" },
            style: {
              background: "none",
              "&:hover": {
                textDecoration: "underline",
                textUnderlineOffset: 4,
                background: "none",
              },
            },
          },
          {
            props: { variant: "outlinedDarkMode" },
            style: ({ theme }: { theme: Theme }) => ({
              padding: "8px 22px",
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.contrastText
                  : theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.light}`,
              background: "transparent",
              "&:hover": {
                background:
                  theme.palette.mode === "dark" ? grey[800] : indigo[50],
              },
            }),
          },
        ],
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        "&:focus": {
          color:
          theme.palette.mode === "dark"
            ? theme.palette.primary.contrastText
            : theme.palette.primary.main,
        }
      }),
    },
  },
};

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: indigo,
    secondary: {
      main: "#e91e63",
    },
    background: {
      default: grey["A100"],
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: baseComponentsOptions,
};

export const baseTheme = responsiveFontSizes(createTheme(baseThemeOptions));
