import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline } from "@mui/material";
import { MuiThemeProvider } from "@/providers/MuiThemeProvider";

export const metadata: Metadata = {
  title: "EverLearn Hub",
  description:
    "Micro-learning SaaS platform where individuals can access bite-sized courses through a subscription model and learn at their own pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
