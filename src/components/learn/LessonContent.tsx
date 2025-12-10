import { Box, Button, CardContent, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { CourseResponse, LessonResponse } from "@/types/api/api-types";

type PropType = {
  selectedLesson: LessonResponse;
  isLessonUnlocked: (
    selectedLesson: CourseResponse["lessons"][number]
  ) => boolean;
  completedLessons: string[];
  markLessonCompleted: (id: string) => void;
  lessonLoading: boolean;
  progressLoading: boolean;
  handleNextLesson: (e: React.MouseEvent<HTMLElement>) => void;
  course: CourseResponse;
  isAuthUser: boolean;
};

export function LessonContent({
  selectedLesson,
  isLessonUnlocked,
  completedLessons,
  markLessonCompleted,
  lessonLoading,
  progressLoading,
  handleNextLesson,
  course,
  isAuthUser
}: PropType) {
  const isCompletedLesson = completedLessons.includes(selectedLesson?.id || "");
  const isLastLesson = selectedLesson?.id === course.lessons.at(-1)?.id;
  return (
    <Box flexGrow={1}>
      {selectedLesson ? (
        <motion.div
          key={selectedLesson.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {!lessonLoading && (
            <Paper sx={{ mb: 2 }} elevation={2}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  {selectedLesson.title}
                </Typography>

                {/* if lesson is locked (not unlocked and not preview) show message */}
                {!isLessonUnlocked(selectedLesson) &&
                !selectedLesson.isPreview ? (
                  <Box>
                    <Typography color="text.secondary" mb={2}>
                      This lesson is locked. Complete the previous lesson to
                      unlock.
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    {/* Render markdown content */}
                    <Box sx={{ mb: 2 }}>
                      <ReactMarkdown>{selectedLesson.content}</ReactMarkdown>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Paper>
          )}

          {isAuthUser && <Box display="flex" justifySelf="end" gap={2} alignItems="center">
            <Button
              variant={isCompletedLesson ? "outlined" : "contained"}
              onClick={() => markLessonCompleted(selectedLesson.id)}
              disabled={progressLoading || isCompletedLesson}
              size="large"
            >
              {isCompletedLesson ? (
                <>
                  Completed
                  <CheckCircleRoundedIcon sx={{ fontSize: 20, ml: 1 }} />
                </>
              ) : progressLoading ? (
                "Saving..."
              ) : (
                <>
                  Mark Completed
                  <CheckCircleOutlinedIcon sx={{ fontSize: 20, ml: 1 }} />
                </>
              )}
            </Button>

            {!isLastLesson && (
              <Button
                variant="text"
                onClick={handleNextLesson}
                disabled={!isCompletedLesson}
                size="large"
              >
                Next Lesson
                <NavigateNextRoundedIcon sx={{ fontSize: 20 }} />
              </Button>
            )}

            {isCompletedLesson && isLastLesson && (
              <Link href={navigation.dashboard.href}>
                <Button
                  variant="contained"
                  disabled={!isCompletedLesson}
                  size="large"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </Box>}
        </motion.div>
      ) : (
        <Typography>No lesson selected.</Typography>
      )}
    </Box>
  );
}
