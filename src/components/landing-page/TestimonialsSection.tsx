"use client";

import { testimonials } from "@/data/testimonials";
import { Box, Container, Grid, Paper, Typography, Avatar } from "@mui/material";
import { motion } from "motion/react";

export function TestimonialsSection() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        What Our Learners Say
      </Typography>

      <Grid container spacing={4}>
        {testimonials.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography>&quot;{item.quote}&quot;</Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Avatar />
                  <Box>
                    <Typography fontWeight={700}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
