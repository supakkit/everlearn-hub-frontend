import { navbarItems } from "@/data/navigation";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";

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
  return (
    <Box>
      <Tooltip title="User menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User" src="" />
        </IconButton>
      </Tooltip>
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
      >
        {navbarItems.settings.map((setting) => (
          <Link key={setting.label} href={setting.href}>
            <MenuItem
              sx={{ width: 160, paddingX: 2, paddingY: 1 }}
              onClick={handleCloseUserMenu}
            >
              <Typography>{setting.label}</Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}
