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
import { paymentAPI } from "@/services/payment";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  const { courseId } = params as { courseId: string };
  const { showToast } = useToast();
  const router = useRouter();

  const [course, setCourse] = useState<CourseResponse>();
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const course = await courseAPI.getOne(courseId);
      setCourse(course);
    } catch (err) {
      setError("Failed to fetch course");
      console.error("Failed to fetch course:", err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const handleBuy = useCallback(async (courseId: string, isFree: boolean) => {
    setBuyLoading(true);
    try {
      if (isFree) {
        const enrollment = await paymentAPI.enrollFreeCourse(courseId);
        showToast("Enrolled course successfully", "success");
        router.push(`${navigation.learn.href}/${enrollment.courseId}`);
        return;
      }

      const { url } = await paymentAPI.buyCourse(courseId);

      if (!url) {
        alert("Unable to open Stripe Checkout. Please try again.");
        return;
      }

      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError("Failed to buy course");
    } finally {
      setBuyLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) return <CourseSkeleton />;
  if (!course || error) return <CourseNotFound />;

  return (
    <Box sx={{ pb: 10 }}>
      <CourseHeroSection
        course={course}
        handleBuy={handleBuy}
        buyLoading={buyLoading}
      />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Grid container spacing={4}>
          <CourseInfo course={course} />
          <BuyBox
            course={course}
            handleBuy={handleBuy}
            buyLoading={buyLoading}
          />
        </Grid>
      </Container>
    </Box>
  );
}
