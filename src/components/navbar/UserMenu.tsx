import { navbarItems, navigation } from "@/data/navigation";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

type UserMenuPropType = {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  anchorElUser: null | HTMLElement;
};

export function UserMenu({
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
}: UserMenuPropType) {
  const { user, isAdmin, logout } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    showToast("Logged out successfully", "success");
    router.replace(navigation.login.href);
  };
  return (
    <Box sx={{ ml: 1 }}>
      {!!user ? (
        <Tooltip title="User menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User" src={user?.avatarUrl}>
              {user.name[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Link href={navigation.login.href}>
          <Button variant="outlined" color="inherit" sx={{ px: 2.5, py: 0.7 }}>
            Login
          </Button>
        </Link>
      )}
      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 1 }}
      >
        {(isAdmin ? navbarItems.adminSettings : navbarItems.settings).map(
          (setting) => (
            <Link key={setting.label} href={setting.href}>
              <MenuItem
                sx={{ width: 180, paddingX: 2, paddingY: 1 }}
                onClick={handleCloseUserMenu}
              >
                <Typography>{setting.label}</Typography>
              </MenuItem>
            </Link>
          )
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
