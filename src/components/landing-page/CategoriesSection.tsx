import { Card, Container, Grid, Typography } from "@mui/material";

export function CategoriesSection() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        Popular Categories
      </Typography>

      <Grid container spacing={3}>
        {[
          "Coding",
          "Business",
          "Design",
          "Language",
          "Productivity",
          "Wellness",
        ].map((cat) => (
          <Grid size={{ xs: 6, md: 4 }} key={cat}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" fontWeight={700}>
                {cat}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
