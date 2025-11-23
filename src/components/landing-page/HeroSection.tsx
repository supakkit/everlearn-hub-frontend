"use client";

import { navigation } from "@/data/navigation";
import { trustBadges } from "@/data/trustBadges";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "motion/react";
import Link from "next/link";

export function HeroSection() {
  const isLoggedIn = false; // test auth

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        height: "100vh",
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Subtle glowing background */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          width: "1200px",
          height: "1200px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
          transform: "translateX(-50%)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            mb={2}
            sx={{
              fontSize: { xs: "2.4rem", md: "3.5rem" },
              lineHeight: 1.2,
              textWrap: "pretty",
            }}
          >
            Learn Anything in Minutes a Day
          </Typography>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Typography
            variant="h6"
            sx={{ maxWidth: 600, mx: "auto", opacity: 0.9, mb: 4 }}
          >
            Micro-learning courses designed for busy people. Grow your skills
            faster with bite-sized lessons you can complete anytime.
          </Typography>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Link
              href={
                isLoggedIn ? navigation.dashboard.href : navigation.signup.href
              }
            >
              <Button
                variant="contained"
                size="large"
                color="secondary"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                }}
              >
                Get Started
              </Button>
            </Link>

            <Link href={navigation.courses.href}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: "white",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Browse Courses
              </Button>
            </Link>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
              mt: 6,
              opacity: 0.95,
            }}
          >
            {trustBadges.map((item, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <item.icon sx={{ fontSize: 50, fontWeight: 800, mb: 1 }} />
                <Typography variant="h6" fontWeight={700}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="grey.300">
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
