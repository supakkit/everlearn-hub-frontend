"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastProvider } from "./ToastProvider";
import { InitialDataProvider } from "./InitialDataProvider";
const NextThemeProvider = dynamic(() => import("./NextThemeProvider"), {
  ssr: false,
});
const MuiThemeProvider = dynamic(() => import("./MuiThemeProvider"), {
  ssr: false,
});

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <NextThemeProvider>
          <MuiThemeProvider>
            <CssBaseline />
            <ToastProvider>
              <InitialDataProvider>{children}</InitialDataProvider>
            </ToastProvider>
          </MuiThemeProvider>
        </NextThemeProvider>
      </AppRouterCacheProvider>
    </AuthProvider>
  );
}
