"use client";

import { appFeatures } from "@/data/appFeatures";
import { Card, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react";

export const FeaturesSection: React.FC = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        Why EverLearn Hub?
      </Typography>

      <Grid container spacing={4}>
        {appFeatures.map((item, index) => (
          <Grid
            container
            size={{ xs: 12, sm: 6, md: 3 }}
            key={index}
            sx={{ justifyContent: "center" }}
          >
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="h-full"
            >
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  height: "100%",
                  maxWidth: 240,
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={1}>
                  {item.title}
                </Typography>
                <Typography variant="body2" mb={4}>
                  {item.content}
                </Typography>
                <item.icon sx={{ marginTop: "auto", fontSize: 80 }} />
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
