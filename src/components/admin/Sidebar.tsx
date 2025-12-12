"use client";

import { adminMenuItems } from "@/data/navigation";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Link from "next/link";

type PropsType = {
  open: boolean;
  drawerWidth: number;
  pathname: string;
};

export function Sidebar({ open, drawerWidth, pathname }: PropsType) {
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        display: { xs: 'none', md: 'block' },
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflowX: "hidden",
        transition: "width 0.3s ease",
        zIndex: 0,
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <Toolbar />
      <List>
        {adminMenuItems.map((item) => (
          <ListItemButton
            key={item.label}
            LinkComponent={Link}
            href={item.href}
            sx={{
              bgcolor: pathname === item.href ? "ButtonShadow" : "inherit",
            }}
          >
            <ListItemIcon>
              <item.icon sx={{ color: 'MenuText' }} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
