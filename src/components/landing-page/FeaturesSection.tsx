"use client";

import { appFeatures } from "@/data/appFeatures";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react";

export function FeaturesSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
          Why EverLearn Hub?
        </Typography>

        <Grid container spacing={4}>
          {appFeatures.map((item, index) => (
            <Grid
              container
              size={{ xs: 12, md: 6, lg: 3 }}
              key={index}
              sx={{ justifyContent: "center" }}
            >
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                className="h-full"
              >
                <Card
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: { xs: "row", lg: "column" },
                    gap: 2,
                    alignItems: "center",
                    textAlign: "center",
                    height: "100%",
                    maxWidth: 500,
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={700} mb={1}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" mb={4}>
                      {item.content}
                    </Typography>
                  </Box>
                  <item.icon
                    sx={{ marginTop: { xs: "0", lg: "auto" }, fontSize: 80 }}
                  />
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
