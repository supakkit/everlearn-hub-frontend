'use client'

import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/theme/darkTheme';
import { PaletteMode } from '@mui/material/styles';
import { baseTheme } from '@/theme/baseTheme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function MuiThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => (mode === 'light' ? baseTheme : darkTheme), [mode]);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);
