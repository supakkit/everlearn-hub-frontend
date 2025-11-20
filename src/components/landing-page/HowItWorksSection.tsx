'use client'

import { Card, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react";

export function HowItWorksSection() {
  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        How It Works
      </Typography>

      <Grid container spacing={4}>
        {["Sign Up", "Choose a Course", "Start Learning"].map((step, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={step}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700} mb={2}>
                  {index + 1}
                </Typography>
                <Typography variant="h6" fontWeight={700} mb={1}>
                  {step}
                </Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
