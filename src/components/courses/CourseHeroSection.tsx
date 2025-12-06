import { CourseResponse } from "@/types/api/api-types";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import SellRoundedIcon from '@mui/icons-material/SellRounded';

type PropType = {
  course: CourseResponse;
};

export function CourseHeroSection({ course }: PropType) {
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4} alignItems="center">
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
              color: (theme) => theme.palette.mode === 'dark' ? 'white' : `${theme.palette.primary.main}`,
              bgcolor: (theme) => `${theme.palette.primary.light + "55"}`,
            }}
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
              <SellRoundedIcon sx={{ mr: 1 }} />{course.isFree ? "Free" : `${course.priceBaht} Baht`}
            </Typography>
          </Box>

          <Link href={navigation.checkout.href}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, borderRadius: 2, fontSize: 20, fontWeight: 'bold' }}
            >
             {course.isFree ? 'Enroll Now' : 'Buy Now'}
          </Button>
            </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
