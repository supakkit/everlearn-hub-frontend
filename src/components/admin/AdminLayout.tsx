"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} drawerWidth={drawerWidth} pathname={pathname} />
      <Box
        sx={{
          flexGrow: 1,
          ml: open ? `${drawerWidth}` : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header
          onToggleSidebar={() => setOpen((prev) => !prev)}
          open={open}
          pathname={pathname}
        />
        <div className="top-bar-height" />
        <Box component="main" sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
