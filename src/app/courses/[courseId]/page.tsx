"use client";

import { CourseNotFound } from "@/components/courses/CourseNotFound";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CourseWithLessonsResponse } from "@/types/api/api-types";
import { courseAPI } from "@/services/courses";
import { CourseSkeleton } from "@/components/courses/CourseSkeleton";
import { paymentAPI } from "@/services/payment";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";
import { CourseDetail } from "@/components/courses/CourseDetail";

export default function CourseDetailPage() {
  const params = useParams();
  const { courseId } = params as { courseId: string };
  const { showToast } = useToast();
  const router = useRouter();

  const [course, setCourse] = useState<CourseWithLessonsResponse>();
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

  const handleBuy = useCallback(
    async (courseId: string, isFree: boolean) => {
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
    },
    [router, showToast]
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) return <CourseSkeleton />;
  if (!course || error) return <CourseNotFound />;

  return (
    <CourseDetail
      mode="public"
      course={course}
      handleBuy={handleBuy}
      buyLoading={buyLoading}
    />
  );
}
