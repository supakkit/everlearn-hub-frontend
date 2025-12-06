"use client";

import { Container, Grid, Box } from "@mui/material";
import { CourseNotFound } from "@/components/courses/CourseNotFound";
import { BuyBox } from "@/components/courses/BuyBox";
import { CourseInfo } from "@/components/courses/CourseInfo";
import { CourseHeroSection } from "@/components/courses/CourseHeroSection";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CourseResponse } from "@/types/api/api-types";
import { courseAPI } from "@/services/courses";
import { CourseSkeleton } from "@/components/courses/CourseSkeleton";

export default function CourseDetailPage() {
  const params = useParams();
  const { courseId } = params as { courseId: string };

  const [course, setCourse] = useState<CourseResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const course = await courseAPI.getOne(courseId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCourse(course);
    } catch (err) {
      setError("Failed to fetch course");
      console.error("Failed to fetch course:", err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) return <CourseSkeleton />;
  if (!course || error) return <CourseNotFound />;

  return (
    <Box sx={{ pb: 10 }}>
      <CourseHeroSection course={course} />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Grid container spacing={4}>
          <CourseInfo course={course} />
          <BuyBox course={course} />
        </Grid>
      </Container>
    </Box>
  );
}
