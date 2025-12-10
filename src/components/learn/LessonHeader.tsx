import { CourseResponse } from "@/types/api/api-types";
import { Box, LinearProgress, Typography } from "@mui/material";

type PropType = {
  course: CourseResponse;
  computeProgressValue: number;
}

export function LessonHeader({ course, computeProgressValue }: PropType) {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        {course.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {course.description}
      </Typography>

      <LinearProgress
        variant="determinate"
        color={computeProgressValue === 100 ? 'success' : 'primary'}
        value={computeProgressValue}
        sx={{ mb: 4, height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}