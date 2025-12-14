import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { CourseWithLessonsResponse, LessonResponse } from "@/types/api/api-types";

type PropType = {
  course: CourseWithLessonsResponse;
  isLessonUnlocked: (lesson: CourseWithLessonsResponse["lessons"][number]) => boolean;
  completedLessons: string[];
  selectedLesson: LessonResponse | null;
  handleSelectLesson: (lesson: CourseWithLessonsResponse["lessons"][number]) => void;
};

export function LessonSidebar({
  course,
  isLessonUnlocked,
  completedLessons,
  selectedLesson,
  handleSelectLesson,
}: PropType) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "300px" },
        overflow: "hidden",
        transition: "width 0.3s ease",
      }}
    >
      <List sx={{ bgcolor: "background.paper" }}>
        {course.lessons.map((lesson) => {
          const unlocked = isLessonUnlocked(lesson);
          const completed = completedLessons.includes(lesson.id);
          return (
            <ListItemButton
              key={lesson.id}
              selected={selectedLesson?.id === lesson.id}
              onClick={() => handleSelectLesson(lesson)}
              disabled={!unlocked}
            >
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <Box>
                      <Typography variant="body1">{lesson.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {lesson.isPreview
                          ? "Preview"
                          : completed
                          ? "Completed"
                          : unlocked
                          ? "Full Lesson"
                          : "Locked"}
                      </Typography>
                    </Box>

                    <Box>
                      {completed ? (
                        <Typography variant="caption" color="success.main">
                          <CheckCircleRoundedIcon />
                        </Typography>
                      ) : !unlocked ? (
                        <Typography variant="caption" color="text.secondary">
                          <LockRoundedIcon />
                        </Typography>
                      ) : null}
                    </Box>
                  </Box>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
