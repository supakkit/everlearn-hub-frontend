import { adminMenuItems, navbarItems, navigation } from "@/data/navigation";
import { SchoolRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { usePathname, useRouter } from "next/navigation";

type PropType = {
  handleCloseDrawer: () => void;
};

export function MobileSidebarDrawer({ handleCloseDrawer }: PropType) {
  const { isAuthUser, isAdmin, logout } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "success");
    router.replace(navigation.login.href);
  };
  return (
    <Box
      sx={{ width: 260, display: "flex", flexDirection: "column", flex: 1 }}
      role="presentation"
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}>
        <SchoolRounded />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          EverLearn Hub
        </Typography>
      </Box>
      <Divider />

      {isAdmin && (
        <>
          <List subheader={<ListSubheader>Admin Menus</ListSubheader>}>
            {adminMenuItems.map((item) => (
              <ListItemButton
                key={item.label}
                LinkComponent={Link}
                href={item.href}
                onClick={handleCloseDrawer}
                sx={{
                  bgcolor: pathname === item.href ? "ButtonShadow" : "inherit",
                }}
              >
                <ListItemIcon>
                  <item.icon sx={{ color: "MenuText" }} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </>
      )}

      <List subheader={<ListSubheader>Main Menus</ListSubheader>}>
        {navbarItems.pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <Link href={page.href} className="w-full">
              <ListItemButton onClick={handleCloseDrawer}>
                <ListItemIcon>
                  <page.icon sx={{ color: "MenuText" }} />
                </ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Box sx={{ p: 2, mt: "auto" }}>
        {isAuthUser ? (
          <Button onClick={handleLogout} fullWidth variant="contained">
            Logout
          </Button>
        ) : (
          <>
            <Link href={navigation.login.href}>
              <Button fullWidth variant="contained" sx={{ mb: 1 }}>
                Login
              </Button>
            </Link>
            <Link href={navigation.signup.href}>
              <Button fullWidth variant="outlined">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}
