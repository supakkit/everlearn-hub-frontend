import { navigation } from "@/data/navigation";
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { CourseResponse } from "@/types/api/api-types";

type PropType = {
  course: CourseResponse;
};

export function CourseInfo({ course }: PropType) {
  return (
    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        What You’ll Learn
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, lineHeight: 1.7 }}
      >
        {course.description}
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Lessons
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <List disablePadding>
          {!!course.lessons &&
            course.lessons.map((lesson, index) => (
              <ListItemButton
                key={lesson.id}
                href={`${navigation.learn.href}/${lesson.id}`}
                disabled={!lesson.isPreview}
                divider
                sx={{
                  height: 62,
                  opacity: lesson.isPreview ? 1 : 0.5,
                  px: 3,
                  "&:hover": {
                    background: lesson.isPreview ? "action.hover" : "inherit",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {lesson.isPreview ? (
                    <PlayCircleIcon color="primary" />
                  ) : (
                    <LockIcon />
                  )}
                </ListItemIcon>

                <ListItemText
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                  primary={`${index + 1}. ${lesson.title}`}
                />

                {lesson.isPreview && (
                  <Typography color="text.secondary">Preview</Typography>
                )}
              </ListItemButton>
            ))}
        </List>
      </Paper>
    </Grid>
  );
}
