import { Container, Grid, Box } from "@mui/material";
import { courses } from "@/data/courses";
import { CourseNotFound } from "@/components/courses/CourseNotFound";
import { BuyBox } from "@/components/courses/BuyBox";
import { CourseInfo } from "@/components/courses/CourseInfo";
import { CourseHeroSection } from "@/components/courses/CourseHeroSection";

type PropType = {
  params: Promise<{ courseId: string }>;
};

export default async function CourseDetailPage({ params }: PropType) {
  const { courseId } = await params;

  const session = ""; // assume

  const course = courses.find((course) => String(course.id) === courseId);

  const handleBuy = () => {
    if (!session) {
    }
  };

  if (!course) {
    return <CourseNotFound />;
  }

  return (
    <Box sx={{ pb: 10 }}>
      <CourseHeroSection course={course} />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Grid container spacing={4}>
          <CourseInfo course={course} />
          <BuyBox courseId={courseId} />
        </Grid>
      </Container>
    </Box>
  );
}
