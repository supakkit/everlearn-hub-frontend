"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  CourseWithLessonsResponse,
  LessonResponse,
  OverviewLessonResponse,
} from "@/types/api/api-types";
import { lessonAPI } from "@/services/lessons";
import { useToast } from "@/providers/ToastProvider";
import { courseAPI } from "@/services/courses";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { LessonFormDialog } from "./LessonFormDialog";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

type LessonFormState =
  | { mode: "create" }
  | { mode: "update"; lesson: LessonResponse }
  | null;

type OverviewLesson = CourseWithLessonsResponse["lessons"][number];

type PropsType = {
  course: CourseWithLessonsResponse;
  onLessonsChange: (
    courseId: string,
    lessons: OverviewLessonResponse[]
  ) => void;
  disabled: boolean;
  onLoadingChange: (isLoading: boolean) => void;
};

export function LessonManagement({
  course,
  onLessonsChange,
  disabled,
  onLoadingChange,
}: PropsType) {
  const [lessons, setLessons] = useState<OverviewLesson[]>(course.lessons);
  const [lessonFormState, setLessonFormState] = useState<LessonFormState>(null);
  const [loading, setLoading] = useState(false);
  const [orderChange, setOrderChange] = useState(false);

  const isLocked: boolean = useMemo(
    () => disabled || loading,
    [disabled, loading]
  );

  const { showToast } = useToast();

  const sortedLessons = [...lessons].sort((a, b) => a.position - b.position);

  const moveLesson = (index: number, direction: "up" | "down") => {
    setLessons((prev) => {
      const ordered = [...prev].sort((a, b) => a.position - b.position);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= ordered.length) return prev;

      const current = ordered[index];
      const target = ordered[targetIndex];

      setOrderChange(true);

      return ordered.map((l) => {
        if (l.id === current.id) return { ...l, position: target.position };
        if (l.id === target.id) return { ...l, position: current.position };
        return l;
      });
    });
  };

  const saveOrder = useCallback(async () => {
    if (!orderChange) return;

    const payload = sortedLessons.map((lesson, index) => ({
      lessonId: lesson.id,
      position: index + 1,
    }));

    setLoading(true);
    onLoadingChange(true);
    try {
      const overviewLessons = await courseAPI.reorderLessons(course.id, {
        items: payload,
      });
      setOrderChange(false);
      showToast("Reorder lessons successfully", "success");
      onLessonsChange(course.id, overviewLessons);
    } catch (err) {
      console.error(err);
      showToast("Failed to reorder lessons", "error");
    } finally {
      setLoading(false);
      onLoadingChange(false);
    }
  }, [
    course.id,
    onLessonsChange,
    orderChange,
    showToast,
    sortedLessons,
    onLoadingChange,
  ]);

  const openCreateLesson = () => {
    setLessonFormState({ mode: "create" });
  };

  const openEditLesson = useCallback(
    async (lessonId: string) => {
      setLoading(true);
      onLoadingChange(true);
      try {
        const lesson = await lessonAPI.getLesson(lessonId);

        setLessonFormState({ mode: "update", lesson });
      } catch (err) {
        console.error(err);
        showToast("Failed to fetch lesson", "error");
      } finally {
        setLoading(false);
        onLoadingChange(false);
      }
    },
    [onLoadingChange, showToast]
  );

  const handleAddNewLesson = (lesson: OverviewLesson) => {
    setLessons((prev) => [...prev, lesson]);
    onLessonsChange(course.id, [...lessons, lesson]);
  };

  const handleUpdateLesson = (lesson: OverviewLesson) => {
    const updatedLessons = lessons.map((l) =>
      l.id === lesson.id ? lesson : l
    );
    setLessons(updatedLessons);
    onLessonsChange(course.id, updatedLessons);
  };

  const handleRemoveLesson = useCallback(
    async (lessonId: string) => {
      setLoading(true);
      onLoadingChange(true);
      try {
        const lesson = await lessonAPI.removeLesson(lessonId);
        showToast("Removed lesson successfully", "success");
        const updatedLessons = lessons.filter((l) => l.id !== lesson.id);
        setLessons(updatedLessons);
        onLessonsChange(course.id, updatedLessons);
      } catch (err) {
        console.error(err);
        showToast("Failed to remove lesson", "error");
      } finally {
        setLoading(false);
        onLoadingChange(false);
      }
    },
    [course.id, lessons, onLessonsChange, onLoadingChange, showToast]
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Lessons
        </Typography>
        <Stack direction="row" gap={1}>
          {orderChange && (
            <Button
              startIcon={<SaveRoundedIcon />}
              variant="contained"
              color="secondary"
              disabled={isLocked}
              onClick={saveOrder}
            >
              Save order
            </Button>
          )}
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            disabled={isLocked}
            onClick={openCreateLesson}
          >
            Add Lesson
          </Button>
        </Stack>
      </Box>

      <List>
        {sortedLessons.map((lesson, index) => (
          <ListItem
            key={lesson.id}
            divider
            secondaryAction={
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  disabled={index === 0 || isLocked}
                  onClick={() => moveLesson(index, "up")}
                >
                  <ArrowUpwardIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={index === sortedLessons.length - 1 || isLocked}
                  onClick={() => moveLesson(index, "down")}
                >
                  <ArrowDownwardIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => openEditLesson(lesson.id)}
                  disabled={isLocked}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemoveLesson(lesson.id)}
                  disabled={isLocked}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </Stack>
            }
          >
            <ListItemText
              primary={
                <Box component="span">
                  {lesson.title}
                  {lesson.isPreview && (
                    <Chip label="Preview" size="small" sx={{ ml: 1 }} />
                  )}
                </Box>
              }
              secondary={`Lesson ${lesson.position}`}
            />
          </ListItem>
        ))}
      </List>

      {lessonFormState && (
        <LessonFormDialog
          mode={lessonFormState.mode}
          open
          courseId={course.id}
          initialData={
            lessonFormState.mode === "update"
              ? lessonFormState.lesson
              : undefined
          }
          onLessonChange={(lesson) =>
            lessonFormState.mode === "create"
              ? handleAddNewLesson(lesson)
              : handleUpdateLesson(lesson)
          }
          onClose={() => setLessonFormState(null)}
        />
      )}
    </Box>
  );
}
