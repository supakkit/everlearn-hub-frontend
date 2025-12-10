"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Stack,
  ToggleButton,
  Alert,
} from "@mui/material";
import { LessonContent } from "@/components/learn/LessonContent";
import { LessonSidebar } from "@/components/learn/LessonSidebar";
import { LessonHeader } from "@/components/learn/LessonHeader";
import { CourseLearningSkeleton } from "@/components/learn/CourseLearningSkeleton";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { CourseResponse, LessonResponse } from "@/types/api/api-types";
import { courseAPI } from "@/services/courses";
import { lessonAPI } from "@/services/lessons";
import { progressAPI } from "@/services/progresses";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";

export default function CourseLearningPage() {
  const { courseId } = useParams() as { courseId: string };
  const { isAuthUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonResponse | null>(
    null
  );
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const [courseLoading, setCourseLoading] = useState(false);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);

  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchCourse = useCallback(async () => {
    setCourseLoading(true);
    setError("");

    try {
      const course = await courseAPI.getOne(courseId);
      setCourse(course);
    } catch (err) {
      console.error(err);
      setError("Error loading course");
    } finally {
      setCourseLoading(false);
    }
  }, [courseId]);

  const fetchLesson = useCallback(async (lessonId: string) => {
    setLessonLoading(true);
    try {
      const lesson = isAuthUser
        ? await lessonAPI.getLesson(lessonId)
        : await lessonAPI.getPreviewLesson(lessonId);
      setSelectedLesson(lesson);
    } catch (err) {
      console.error(err);
      setError("Error loading lesson");
    } finally {
      setLessonLoading(false);
    }
  }, [isAuthUser]);

  const fetchProgress = useCallback(async () => {
    if (!isAuthUser) return;
    setProgressLoading(true);

    try {
      const courseProgress = await progressAPI.getCourseProgress(courseId);
      setCompletedLessons(courseProgress.completedLessons);
    } catch (err) {
      console.error(err);
      setError("Error loading progress");
    } finally {
      setProgressLoading(false);
    }
  }, [courseId, isAuthUser]);

  useEffect(() => {
    if (!courseId) return;
    fetchCourse();
    fetchProgress();
  }, [courseId, fetchCourse, fetchProgress]);

  useEffect(() => {
    if (!course || progressLoading || courseLoading || !course.lessons) return;

    if (!isAuthUser) {
      const lessonId = searchParams.get("lessonId");
      const previewLesson = course.lessons.find(
        (lesson) => lessonId === lesson.id && lesson.isPreview === true
      );
      if (!previewLesson) return router.replace(navigation.login.href);
      fetchLesson(previewLesson.id);
      return;
    }

    // No progress -> open first lesson
    if (completedLessons.length === 0) {
      const firstLesson = course.lessons[0];
      if (firstLesson) fetchLesson(firstLesson.id);
      return;
    }

    // Find the last completed lesson index
    const lastCompletedId = completedLessons[completedLessons.length - 1];
    const lastIndex = course.lessons.findIndex((l) => l.id === lastCompletedId);

    // If last completed lesson is the final lesson -> open this lesson again
    if (lastIndex === course.lessons.length - 1) {
      fetchLesson(lastCompletedId);
      return;
    }

    // Otherwise -> open the next lesson
    const nextLesson = course.lessons[lastIndex + 1];
    if (nextLesson) {
      fetchLesson(nextLesson.id);
    } else {
      fetchLesson(lastCompletedId);
    }
  }, [
    course,
    completedLessons,
    progressLoading,
    courseLoading,
    fetchLesson,
    isAuthUser,
    router,
    searchParams
  ]);

  // Helpers
  const lessonIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    course?.lessons.forEach((lesson, index) => map.set(lesson.id, index));
    return map;
  }, [course]);

  const isLessonUnlocked = useCallback(
    (lesson: CourseResponse["lessons"][number]) => {
      if (lesson.isPreview) return true;
      if (!course) return false;

      const idx = lessonIndexMap.get(lesson.id);
      if (typeof idx !== "number") return false;
      if (idx === 0) return true; // first lesson unlocked by default

      // unlocked if previous lesson is completed
      const prevLesson = course.lessons[idx - 1];
      return !!prevLesson && completedLessons.includes(prevLesson.id);
    },
    [course, completedLessons, lessonIndexMap]
  );

  const computeProgressValue = useMemo(() => {
    if (!course) return 0;
    const total = course.lessons.length || 1;
    const completed = completedLessons.length;
    return Math.round((completed / total) * 100);
  }, [course, completedLessons]);

  // Mark current lesson completed
  const markLessonCompleted = useCallback(async (lessonId: string) => {
    setProgressLoading(true);
    try {
      await progressAPI.markLessonComplete(lessonId);
      setCompletedLessons((prev) =>
        prev.includes(lessonId) ? prev : [...prev, lessonId]
      );
    } catch (err) {
      console.error(err);
      setError("Failed marking lesson complete");
    } finally {
      setProgressLoading(false);
    }
  }, []);

  const handleSelectLesson = useCallback(
    (lesson: CourseResponse["lessons"][number]) => {
      if (lesson.id === selectedLesson?.id) return;

      setError("");
      if (isLessonUnlocked(lesson)) {
        fetchLesson(lesson.id);
      } else {
        setError("Complete previous lesson to unlock.");
      }
    },
    [isLessonUnlocked, fetchLesson, selectedLesson]
  );

  const handleNextLesson = async () => {
    if (!course || !selectedLesson) return;

    const idx = lessonIndexMap.get(selectedLesson.id);
    if (typeof idx !== "number") return;

    // mark current completed first (if not)
    if (!completedLessons.includes(selectedLesson.id)) {
      await markLessonCompleted(selectedLesson.id);
    }

    const next = course.lessons[idx + 1];
    if (!next) {
      setError("You finished the last lesson of this course.");
      return;
    }

    if (isLessonUnlocked(next)) {
      fetchLesson(next.id);
    } else {
      setError("Next lesson is locked.");
    }
  };

  if (courseLoading) return <CourseLearningSkeleton />;
  if (!courseId || !course) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {!!error && <Alert severity="error">{error}</Alert>}

      <LessonHeader
        course={course}
        computeProgressValue={computeProgressValue}
      />

      {/* Toggle button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack
          direction="row"
          gap={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: { xs: "fit-content", md: sidebarOpen ? 300 : "fit-content" },
          }}
        >
          <Typography variant="h6">Lessons</Typography>
          <ToggleButton
            value="sidebarOpen"
            size="small"
            onChange={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <>
                <MenuOpenRoundedIcon
                  sx={{ display: { xs: "none", md: "block" } }}
                />
                <ExpandLessOutlinedIcon
                  sx={{ display: { xs: "block", md: "none" } }}
                />
              </>
            ) : (
              <>
                <KeyboardArrowRightRoundedIcon
                  sx={{ display: { xs: "none", md: "block" } }}
                />
                <ExpandMoreOutlinedIcon
                  sx={{ display: { xs: "block", md: "none" } }}
                />
              </>
            )}
          </ToggleButton>
        </Stack>

        <Typography variant="body2" color="text.secondary" ml="auto">
          {completedLessons.length}/{course.lessons.length} completed
        </Typography>
      </Box>

      <Box display="flex" gap={4} flexDirection={{ xs: "column", md: "row" }}>
        {/* Lesson list */}
        {sidebarOpen && (
          <LessonSidebar
            course={course}
            isLessonUnlocked={isLessonUnlocked}
            completedLessons={completedLessons}
            selectedLesson={selectedLesson}
            handleSelectLesson={handleSelectLesson}
          />
        )}

        {/* Lesson content */}
        {!!selectedLesson && (
          <LessonContent
            selectedLesson={selectedLesson}
            isLessonUnlocked={isLessonUnlocked}
            completedLessons={completedLessons}
            markLessonCompleted={markLessonCompleted}
            lessonLoading={lessonLoading}
            progressLoading={progressLoading}
            handleNextLesson={handleNextLesson}
            course={course}
            isAuthUser={isAuthUser}
          />
        )}
      </Box>
    </Container>
  );
}
