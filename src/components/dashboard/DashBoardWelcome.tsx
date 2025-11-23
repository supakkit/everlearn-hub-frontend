"use client";

import { User } from "@/types/user";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

type PropType = {
  user: User;
};

export function DashBoardWelcome({ user }: PropType) {
  return (
    <Box>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome back, {user.fullName} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Here&apos;s your learning progress summary.
        </Typography>
      </motion.div>
    </Box>
  );
}
