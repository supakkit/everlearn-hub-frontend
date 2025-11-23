"use client";

import { pillars } from "@/data/pillars";
import { Box, Container, Grid, Typography, Card } from "@mui/material";
import { motion } from "motion/react";

export function PillarsSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
          Our Learning Philosophy
        </Typography>

        <Grid container spacing={4}>
          {pillars.map((pillar, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={pillar.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card
                  sx={{
                    p: 4,
                    textAlign: "center",
                    height: "100%",
                    borderRadius: 2,
                  }}
                >
                  <pillar.icon sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} mb={1}>
                    {pillar.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pillar.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
