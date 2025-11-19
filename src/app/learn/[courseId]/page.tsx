"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

type Lesson = {
  id: string;
  title: string;
  type: "video" | "text";
  content: string;
  isPreview: boolean;
};

type Course = {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
};

export default function CourseLearningPage() {
  const { courseId } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock fetch — replace with backend API
  const fetchCourse = async (courseId: string) => {
    setLoading(true);
    console.log('run')
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockCourse: Course = {
      id: courseId,
      title: "Mastering React for Beginners",
      progress: 40,
      lessons: [
        {
          id: "lesson_1",
          title: "Introduction to React",
          type: "video",
          content: "Video content placeholder",
          isPreview: true,
        },
        {
          id: "lesson_2",
          title: "JSX and Components",
          type: "video",
          content: "Video content placeholder",
          isPreview: false,
        },
        {
          id: "lesson_3",
          title: "State and Props",
          type: "text",
          content: "Text content placeholder",
          isPreview: false,
        },
      ],
    };
    setCourse(mockCourse);
    setSelectedLesson(mockCourse.lessons[0]);
    setLoading(false);
  };

  useEffect(() => {
    if (courseId) fetchCourse(courseId as string);
  }, [courseId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5">Loading course...</Typography>
      </Container>
    );
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
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {course.title}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={course.progress}
        sx={{ mb: 4, height: 10, borderRadius: 5 }}
      />

      <Box display="flex" gap={4} flexDirection={{ xs: "column", md: "row" }}>
        {/* Lesson list */}
        <Box sx={{ width: { xs: "100%", md: "300px" } }}>
          <Typography variant="h6" mb={2}>
            Lessons
          </Typography>
          <List>
            {course.lessons.map((lesson) => (
              <ListItemButton
                key={lesson.id}
                selected={selectedLesson?.id === lesson.id}
                onClick={() =>
                  setSelectedLesson(lesson.isPreview ? lesson : lesson)
                }
                disabled={!lesson.isPreview && !selectedLesson}
              >
                <ListItemText
                  primary={lesson.title}
                  secondary={
                    lesson.isPreview ? "Preview" : "Full Lesson"
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Lesson content */}
        <Box flexGrow={1}>
          {selectedLesson && (
            <motion.div
              key={selectedLesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    {selectedLesson.title}
                  </Typography>
                  <Typography variant="body1">
                    {selectedLesson.content}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Box>
      </Box>
    </Container>
  );
}
