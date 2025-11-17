"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { ModeSwitch } from "./ModeSwitch";
import { useState } from "react";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { Container } from "@mui/material";
import Link from "next/link";

const pages: { label: string; href: string }[] = [
  { label: "Courses", href: "/courses" },
  { label: "Contact Us", href: "/contact" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function TopAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Mobile Sidebar Drawer
  const drawer = (
    <Box sx={{ width: 260 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}>
        <SchoolRoundedIcon />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          EverLearn Hub
        </Typography>
      </Box>

      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton>
              <Link href={page.href}>
                <ListItemText primary={page.label} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="contained" sx={{ mb: 1 }}>
          Login
        </Button>
        <Button fullWidth variant="outlined">
          Sign Up
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} className="top-bar-height"  >
        {/* Mobile menu button */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          color="inherit"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        <Container sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Logo */}
          <Link href="/">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SchoolRoundedIcon sx={{ display: { xs: "none", md: "flex" } }} />
              <Typography
                variant="h6"
                noWrap
                sx={{ fontWeight: 700, cursor: "pointer" }}
              >
                EverLearn Hub
              </Typography>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <Link key={page.label} href={page.href}>
                <Button color="inherit">{page.label}</Button>
              </Link>
            ))}
          </Box>
        </Container>

        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            justifyContent: "end",
          }}
        >
          <ModeSwitch />

          {/* User Menu */}
          <Box>
            <Tooltip title="User menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/avatar.png" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Container>
      </Toolbar>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
