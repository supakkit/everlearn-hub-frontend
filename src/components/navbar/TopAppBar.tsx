"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { ModeSwitch } from "./ModeSwitch";
import { useState } from "react";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import { Container, Divider } from "@mui/material";
import Link from "next/link";
import { navbarItems, navigation } from "@/data/navigation";
import { MobileSidebarDrawer } from "./MobileSidebarDrawer";
import { UserMenu } from "./UserMenu";

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

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between" }}
        className="top-bar-height"
      >
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
          <Link href={navigation.home.href}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SchoolRounded sx={{ display: { xs: "none", md: "flex" } }} />
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
            {navbarItems.pages.map((page) => (
              <Typography key={page.label} component={Link} href={page.href}>
                {page.label}
              </Typography>
            ))}
          </Box>
        </Container>
        <Container
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "end",
          }}
        >
          <ModeSwitch />
          <Divider orientation="vertical" variant="middle" flexItem />
          <UserMenu
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
          />
        </Container>
      </Toolbar>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <MobileSidebarDrawer handleCloseDrawer={() => setMobileOpen(false)} />
      </Drawer>
    </AppBar>
  );
}
