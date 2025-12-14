"use client";

import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import { adminMenuItems, navigation } from "@/data/navigation";

type PropsType = {
  onToggleSidebar: () => void;
  open: boolean;
  pathname: string;
};

export function Header({ onToggleSidebar, open, pathname }: PropsType) {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        zIndex: 10,
        bgcolor: (theme) => `${theme.palette.background.default}`,
      }}
    >
      <Toolbar disableGutters>
        <Stack direction="row" alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mx: 1, display: { xs: "none", md: "inline-flex" } }}
          >
            <LastPageRoundedIcon
              sx={{
                fontSize: 25,
                color: "LinkText",
                transform: open ? "rotateY(180deg)" : "none",
              }}
            />
          </IconButton>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{ display: { xs: "none", md: "block" } }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ ml: 2, flexGrow: 1 }}
          >
            {
              adminMenuItems.find(
                (item) =>
                  pathname === item.href ||
                  (item.href !== navigation.admin.dashboard.href &&
                    pathname.startsWith(item.href))
              )?.title
            }
          </Typography>
        </Stack>
      </Toolbar>
    </Box>
  );
}
