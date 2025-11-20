'use client'

import { Card, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react";

export function FeaturesSection() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        Why EverLearn Hub?
      </Typography>

      <Grid container spacing={4}>
        {[
          "Micro-Lessons",
          "Expert Instructors",
          "Learn from Anywhere",
          "Downloadable PDFs",
        ].map((item, index) => (
          <Grid size={{ xs: 12, md: 3 }} key={item}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
            >
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                {item}
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                faucibus.
              </Typography>
            </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
