import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "motion/react";

export function HeroSection() {
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
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button variant="outlined" size="large" color="inherit">
            Browse Courses
          </Button>
        </Container>
      </Box>
    </motion.div>
  );
}
