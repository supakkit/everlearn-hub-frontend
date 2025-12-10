"use client";

import { navigation } from "@/data/navigation";
import { DashboardResponse } from "@/types/api/api-types";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

type PropType = {
  courses: DashboardResponse["enrolledCourses"];
};

export function CourseList({ courses }: PropType) {
  return (
    <Grid container spacing={3}>
      {courses.map((course, i) => (
        <Grid size={{ xs: 12, md: 6 }} key={course.courseId}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    {course.completedLessons.length}/{course.totalLessons}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {course.progressPercentage}% completed
                </Typography>

                <LinearProgress
                  variant="determinate"
                  color={
                    course.progressPercentage < 100 ? "warning" : "success"
                  }
                  value={course.progressPercentage}
                  sx={{ mb: 2 }}
                />

                <Button
                  component={Link}
                  href={`${navigation.learn.href}/${course.courseId}`}
                  variant="contained"
                  fullWidth
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
