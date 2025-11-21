"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { courses } from "@/data/courses";
import { CourseCard } from "../courses/CourseCard";

export const CoursesSection: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);
  return (
    <Container sx={{ py: 8 }}>
      <Grid
        container
        sx={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <Typography variant="h4" fontWeight={700}>
          Top Courses
        </Typography>
        <Link href={navigation.courses.href}>
          <Button variant="text">
            Explore all courses
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
          </Button>
        </Link>
      </Grid>

      <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
        <Box sx={{ display: "flex", gap: 3, paddingLeft: 3, paddingY: 2, height: 450 }}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};
