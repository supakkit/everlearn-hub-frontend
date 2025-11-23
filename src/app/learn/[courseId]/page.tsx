"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Stack,
  ToggleButton,
  Alert,
} from "@mui/material";
import type { Course, Lesson } from "@/types/course";
import { courses } from "@/data/courses";
import { userData } from "@/data/user";
import { LessonContent } from "@/components/learn/LessonContent";
import { LessonSidebar } from "@/components/learn/LessonSidebar";
import { LessonHeader } from "@/components/learn/LessonHeader";
import { LessonSkeleton } from "@/components/learn/LessonSkeleton";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

export default function CourseLearningPage() {
  const params = useParams() as { courseId?: string };
  const courseId = params?.courseId ?? "";

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [error, setError] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Combined loading flag
  const loading = loadingCourse || loadingProgress;

  // fetch course (whole course) — keep old approach (one fetch)
  const fetchCourse = useCallback(async () => {
    if (!courseId) return;
    setLoadingCourse(true);
    setError('');
    try {
      //   const res = await fetch(`/api/courses/${encodeURIComponent(courseId)}`);
      //   if (!res.ok) throw new Error(`Failed to load course: ${res.status}`);
      //   const data: CourseApiResponse = await res.json();

      // Mock data
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = courses.find((course) => course.id === courseId) || null;
      if (!data) throw new Error(`Failed to load course`);

      setCourse(data);
      setSelectedLesson(data.lessons?.[0] ?? null);
    } catch (err) {
      console.error(err);
      setCourse(null);
      setError("Failed to load course." );
    } finally {
      setLoadingCourse(false);
    }
  }, [courseId]);

  // fetch user's completed lessons for this course (separate endpoint)
  const fetchProgress = useCallback(async () => {
    if (!courseId) return;
    setLoadingProgress(true);
    setError('');
    try {
      // const res = await fetch(`/api/users/me/course-progress/${encodeURIComponent(courseId)}`);
      // if (!res.ok) {
      //   // 404 or empty progress are okay — treat as no completed lessons
      //   if (res.status === 404) {
      //     setCompletedLessons([]);
      //   } else {
      //     throw new Error(`Failed to load progress: ${res.status}`);
      //   }
      // } else {
      //   const data: ProgressResponse = await res.json();
      //   setCompletedLessons(data.completedLessons || []);
      // }

      // Mock data
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = userData.enrolledCourses.find(
        (course) => course.id === courseId
      );
      if (data) setCompletedLessons(data.lessonProgress);
      else setCompletedLessons([]);

    } catch (err) {
      console.error(err);
      setCompletedLessons([]);
      setError("Failed to load user progress.");
    } finally {
      setLoadingProgress(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    fetchCourse();
    fetchProgress();
  }, [courseId, fetchCourse, fetchProgress]);

  // Helpers
  const lessonIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    course?.lessons.forEach((lesson, index) => map.set(lesson.id, index));
    return map;
  }, [course]);

  const isLessonUnlocked = useCallback(
    (lesson: Lesson) => {
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
  const markLessonCompleted = useCallback(
    async (lessonId: string) => {
      if (!courseId) return;
      if (completedLessons.includes(lessonId)) {
        setError("Lesson already completed.");
        return;
      }
      setSaving(true);
      setError('');
      try {
        // const res = await fetch(`/api/users/me/course-progress/${encodeURIComponent(courseId)}/complete-lesson`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ lessonId }),
        // });
        // if (!res.ok) throw new Error(`Failed to mark completed: ${res.status}`);

        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 800));

        // optimistic update: append to completedLessons
        setCompletedLessons((prev) => {
          if (prev.includes(lessonId)) return prev;
          return [...prev, lessonId];
        });
        
      } catch (err) {
        console.error(err);
        setError("Failed to mark lesson completed.");
      } finally {
        setSaving(false);
      }
    },
    [courseId, completedLessons]
  );

  const handleSelectLesson = useCallback(
    (lesson: Lesson) => {
      setError('');
      if (isLessonUnlocked(lesson)) {
        setSelectedLesson(lesson);
      } else {
        setError( "Complete the previous lesson to unlock this one.");
      }
    },
    [isLessonUnlocked]
  );

  const handleNextLesson = useCallback(async () => {
    setError('');

    if (!course || !selectedLesson) return;
    const idx = lessonIndexMap.get(selectedLesson.id);
    if (typeof idx !== "number") return;
    // mark current completed first (if not)
    if (!completedLessons.includes(selectedLesson.id)) {
      await markLessonCompleted(selectedLesson.id);
    }
    const nextIdx = idx + 1;
    if (nextIdx >= course.lessons.length) {
      setError("You finished the last lesson of this course.");
      return;
    }
    const nextLesson = course.lessons[nextIdx];
    if (isLessonUnlocked(nextLesson)) {
      setSelectedLesson(nextLesson);
    } else {
      setError("Next lesson is locked.");
    }
  }, [
    course,
    selectedLesson,
    lessonIndexMap,
    completedLessons,
    markLessonCompleted,
    isLessonUnlocked,
  ]);

  if (loading) {
    return <LessonSkeleton />;
  }

  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5" color="error">
          Course not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {!!error && <Alert severity='error'>{error}</Alert>}

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
        <LessonContent
          selectedLesson={selectedLesson}
          isLessonUnlocked={isLessonUnlocked}
          completedLessons={completedLessons}
          markLessonCompleted={markLessonCompleted}
          saving={saving}
          handleNextLesson={handleNextLesson}
          course={course}
        />
      </Box>
    </Container>
  );
}
