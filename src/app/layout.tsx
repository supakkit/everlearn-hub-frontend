import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Script from "next/script";
import { TopAppBar } from "@/components/navbar/TopAppBar";
import { ChildrenPropType } from "@/types/common/childrenProp";

export const metadata: Metadata = {
  title: "EverLearn Hub",
  description:
    "Micro-learning SaaS platform where individuals can access bite-sized courses through a subscription model and learn at their own pace.",
};

export default function RootLayout({ children }: ChildrenPropType) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                const stored = localStorage.getItem("theme");
                const prefersDark =
                  window.matchMedia &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches;
                const theme =
                  stored === "dark" || (!stored && prefersDark) ? "dark" : "light";

                // set attribute and class for easy CSS hooks
                document.documentElement.setAttribute("data-theme", theme);
                if (theme === "dark") document.documentElement.classList.add("dark");
                else document.documentElement.classList.remove("dark");

                // hint browser for built-in form controls
                document.documentElement.style.colorScheme = theme;
              } catch {
                // fail silently
              }
            })();
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <main className="min-h-screen">
            <TopAppBar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
