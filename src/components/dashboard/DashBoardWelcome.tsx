import { User } from "@/types/api/api-types";
import { Box, Typography } from "@mui/material";

type PropType = {
  user: User;
};

export function DashBoardWelcome({ user }: PropType) {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Welcome back, {user.name} 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Here&apos;s your learning progress summary.
      </Typography>
    </Box>
  );
}
