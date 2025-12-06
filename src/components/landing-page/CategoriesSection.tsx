"use client";

import { Box, Card, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "motion/react";
import { useInitialData } from "@/providers/InitialDataProvider";

export function CategoriesSection() {
  const { courseCategoryNames } = useInitialData();
  return (
    <Box sx={{ py: 8 }}>
     <Container >
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        Popular Categories
      </Typography>

      <Grid container spacing={3}>
        {courseCategoryNames.slice(1, 7).map((cat) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.slug}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <Link href={cat.href}>
                <Card sx={{ p: 4, textAlign: "center" }}>
                  <cat.icon sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" fontWeight={700}>
                    {cat.name}
                  </Typography>
                </Card>
              </Link>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container> 
    </Box>
    
  );
}
