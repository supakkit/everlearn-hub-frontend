"use client";

import React, {
  createContext,
  useMemo,
  useContext,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes";
import { darkTheme } from "@/theme/darkTheme";
import { baseTheme } from "@/theme/baseTheme";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function MuiThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme, setTheme } = useNextTheme();

  const current = resolvedTheme === "dark" ? "dark" : "light";

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setTheme(current === "light" ? "dark" : "light");
      },
    }),
    [current, setTheme]
  );

  const muiTheme = current === "dark" ? darkTheme : baseTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);
