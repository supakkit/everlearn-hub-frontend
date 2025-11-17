import { Anuphan } from "next/font/google";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
  }
}

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  display: "swap",
});

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: anuphan.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      light: blue['A100'],
        main: blue['A400'],
        dark: blue[700],
      contrastText: 'white',
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

export const baseTheme = createTheme(baseThemeOptions);
