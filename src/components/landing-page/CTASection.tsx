"use client";

import { navigation } from "@/data/navigation";
import { Box, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import { motion } from "motion/react";

export function CTASection() {
  return (
    <Box
      sx={{
        py: 20,
        mt: 10,
        background: (theme) =>
          `linear-gradient(180deg, ${theme.palette.primary.dark}, #222)`,
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" fontWeight={700} mb={2}>
            Start Your Learning Journey Today
          </Typography>

          <Typography
            variant="h6"
            fontWeight={400}
            mb={4}
            sx={{ fontStyle: "italic", opacity: 0.85 }}
          >
            “Learning is not about speed, it’s about building knowledge that
            lasts.”
          </Typography>

          <Link href={navigation.signup.href}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 3,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 28px rgba(0,0,0,0.3)",
                },
              }}
            >
              Sign Up Free
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Box>
  );
}
