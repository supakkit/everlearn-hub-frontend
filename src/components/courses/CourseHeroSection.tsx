import { Course } from "@/types/course";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

type PropType = {
  course: Course;
};

export function CourseHeroSection({ course }: PropType) {
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Course thumbnail */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Image
              src={course.image}
              alt={course.title}
              width={600}
              height={400}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Grid>

        {/* Course info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Chip
            label={course.category}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {course.title}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.6 }}
          >
            {course.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              2222 Baht
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ width: 260, height: 54, borderRadius: 2 }}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
