import { CourseWithLessonsResponse } from "@/types/api/api-types";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import { CourseDetailMode } from "./CourseDetail";

type PropType = {
  mode?: CourseDetailMode;
  course: CourseWithLessonsResponse;
  handleBuy?: (courseId: string, isFree: boolean) => Promise<void>;
  buyLoading: boolean;
};

export function CourseHeroSection({
  mode = "public",
  course,
  handleBuy,
  buyLoading = false,
}: PropType) {
  const isAdminPreview = mode === "admin-preview";

  return (
    <Container sx={{ py: 6, minHeight: "100vh" }}>
      <Grid container spacing={6} alignItems="center">
        {/* Course thumbnail */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <Image
              src={course.imageUrl}
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
            label={course.categoryName}
            variant="outlined"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "white"
                  : `${theme.palette.primary.main}`,
              bgcolor: (theme) => `${theme.palette.primary.light + "55"}`,
            }}
          />

          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {course.title}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.6,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              <SellRoundedIcon sx={{ mr: 1 }} />
              {course.isFree ? "Free" : `${course.priceBaht} Baht`}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              width: 180,
              borderRadius: 2,
              fontSize: 20,
              fontWeight: "bold",
            }}
            disabled={buyLoading || isAdminPreview}
            onClick={() => handleBuy && handleBuy(course.id, course.isFree)}
          >
            {course.isFree ? "Enroll Now" : "Buy Now"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
