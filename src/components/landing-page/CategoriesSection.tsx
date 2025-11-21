"use client";

import { courseCategories } from "@/data/courseCategories";
import { Card, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

export const CategoriesSection: React.FC = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        Popular Categories
      </Typography>

      <Grid container spacing={3}>
        {courseCategories.map((cat) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.slug}>
            <Link href={cat.href}>
              <Card sx={{ p: 4, textAlign: "center" }}>
                <cat.icon sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" fontWeight={700}>
                  {cat.title}
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
