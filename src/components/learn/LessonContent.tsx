import { Box, Button, CardContent, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import {
  CourseWithLessonsResponse,
  LessonResponse,
} from "@/types/api/api-types";
import MarkdownView from "./MarkdownView";

type PropType = {
  selectedLesson: LessonResponse;
  isLessonUnlocked: (
    selectedLesson: CourseWithLessonsResponse["lessons"][number]
  ) => boolean;
  completedLessons: string[];
  markLessonCompleted: (id: string) => void;
  lessonLoading: boolean;
  progressLoading: boolean;
  handleNextLesson: (e: React.MouseEvent<HTMLElement>) => void;
  course: CourseWithLessonsResponse;
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
  isAuthUser,
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
            <Paper sx={{ mb: 2, p: 2 }} elevation={0}>
              <CardContent>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                  mb={2}
                >
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
                  <MarkdownView content={selectedLesson.content} />
                )}
              </CardContent>
            </Paper>
          )}

          {isAuthUser && (
            <Box display="flex" justifySelf="end" gap={2} alignItems="center">
              <Button
                variant={isCompletedLesson ? "outlined" : "contained"}
                onClick={() => markLessonCompleted(selectedLesson.id)}
                disabled={progressLoading || isCompletedLesson}
                size="large"
                endIcon={
                  isCompletedLesson ? (
                    <CheckCircleRoundedIcon />
                  ) : progressLoading ? (
                    <SaveRoundedIcon />
                  ) : (
                    <CheckCircleOutlinedIcon />
                  )
                }
              >
                {isCompletedLesson
                  ? "Completed"
                  : progressLoading
                  ? "Saving..."
                  : "Mark Completed"}
              </Button>

              {!isLastLesson && (
                <Button
                  variant="text"
                  onClick={handleNextLesson}
                  disabled={!isCompletedLesson}
                  size="large"
                  endIcon={<NavigateNextRoundedIcon />}
                >
                  Next Lesson
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
            </Box>
          )}
        </motion.div>
      ) : (
        <Typography>No lesson selected.</Typography>
      )}
    </Box>
  );
}
