import { Container, Grid, Box } from "@mui/material";
import { BuyBox } from "@/components/courses/BuyBox";
import { CourseInfo } from "@/components/courses/CourseInfo";
import { CourseHeroSection } from "@/components/courses/CourseHeroSection";
import { CourseWithLessonsResponse } from "@/types/api/api-types";

export type CourseDetailMode = "public" | "admin-preview";

type CourseDetailProps = {
  mode?: CourseDetailMode;
  course: CourseWithLessonsResponse;
  handleBuy?: (courseId: string, isFree: boolean) => Promise<void>;
  buyLoading?: boolean;
};

export function CourseDetail({
  mode = "public",
  course,
  handleBuy,
  buyLoading = false,
}: CourseDetailProps) {
  return (
    <Box sx={{ pb: 10 }}>
      <CourseHeroSection
        mode={mode}
        course={course}
        handleBuy={handleBuy}
        buyLoading={buyLoading}
      />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Grid container spacing={4}>
          <CourseInfo course={course} />
          <BuyBox
            mode={mode}
            course={course}
            handleBuy={handleBuy}
            buyLoading={buyLoading}
          />
        </Grid>
      </Container>
    </Box>
  );
}
