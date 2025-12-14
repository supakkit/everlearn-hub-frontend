"use client";

import { CourseNotFound } from "@/components/courses/CourseNotFound";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CourseWithLessonsResponse } from "@/types/api/api-types";
import { courseAPI } from "@/services/courses";
import { CourseSkeleton } from "@/components/courses/CourseSkeleton";
import { CourseDetail } from "@/components/courses/CourseDetail";
import { Box, Button } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { navigation } from "@/data/navigation";

export default function PreviewCourseDetail() {
  const params = useParams();
  const { courseId } = params as { courseId: string };
  const router = useRouter();

  const [course, setCourse] = useState<CourseWithLessonsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const course = await courseAPI.getOneByAdmin(courseId);
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
    <Box>
      <Box sx={{ position: "absolute", p: 1 }}>
        <Button
          variant="link"
          sx={{ p: 1 }}
          onClick={() => router.push(navigation.admin.courses.href)}
        >
          <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16, mr: 1 }} />
          Back to course dashboard
        </Button>
      </Box>
      <CourseDetail mode="admin-preview" course={course} />
    </Box>
  );
}
