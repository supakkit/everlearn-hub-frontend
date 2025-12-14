"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { usePathname } from "next/navigation";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} pathname={pathname} />
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          overflowX: 'auto',
        }}
      >
        <Header
          onToggleSidebar={() => setOpen((prev) => !prev)}
          open={open}
          pathname={pathname}
        />
        <div className="top-bar-height" />
        <Box component="main" sx={{ p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
