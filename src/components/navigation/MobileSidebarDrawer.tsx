import { navbarItems, navigation } from "@/data/navigation";
import { SchoolRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";

type PropType = {
  handleDrawerToggle: () => void;
};

export const MobileSidebarDrawer: React.FC<PropType> = ({
  handleDrawerToggle,
}) => (
  <Box sx={{ width: 260 }} role="presentation" onClick={handleDrawerToggle}>
    <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}>
      <SchoolRounded />
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        EverLearn Hub
      </Typography>
    </Box>

    <Divider />
    <List>
      {navbarItems.pages.map((page) => (
        <ListItem key={page.label} disablePadding>
          <Link href={page.href} className="w-full">
            <ListItemButton>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
    <Divider />

    <Box sx={{ p: 2 }}>
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
    </Box>
  </Box>
);
