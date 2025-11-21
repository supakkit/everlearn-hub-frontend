"use client";

import { navigation } from "@/data/navigation";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  const isLoggedIn = false; // test auth
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Box
        sx={{
          py: 10,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={700} mb={2}>
            Learn Anything in Minutes a Day
          </Typography>
          <Typography variant="h6" mb={4}>
            Micro-learning courses designed for busy people like you.
          </Typography>
            <Link
              href={
                isLoggedIn ? navigation.library.href : navigation.signup.href
              }
            >
              <Button variant="contained" size="large" color="secondary" sx={{ m: 1 }}>
                Get Started
              </Button>
            </Link>
            <Link href={navigation.courses.href}>
              <Button variant="outlined" size="large" color="inherit" sx={{ m: 1 }}>
                Browse Courses
              </Button>
            </Link>
        </Container>
      </Box>
    </motion.div>
  );
};
