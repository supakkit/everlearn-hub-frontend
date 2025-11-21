"use client";

import { navigation } from "@/data/navigation";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export const CTASection: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 10,
        mt: 10,
        background: (theme) =>
          `linear-gradient(0deg, #222 , ${theme.palette.primary.dark})`,
        color: "white",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={2}>
        Start Your Learning Journey Today
      </Typography>
      <Link href={navigation.signup.href}>
        <Button variant="contained" color="secondary" size="large">
          Sign Up Free
        </Button>
      </Link>
    </Box>
  );
};
