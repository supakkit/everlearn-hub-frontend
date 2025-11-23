"use client";

import { navigation } from "@/data/navigation";
import { enrolledCourse } from "@/types/user";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

type PropType = {
  courses: enrolledCourse[];
};

export function CourseList({ courses }: PropType) {
  return (
    <Grid container spacing={3}>
      {courses.map((course, i) => (
        <Grid size={{ xs: 12, md: 6 }} key={course.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {course.progress}% completed
                </Typography>

                <LinearProgress
                  variant="determinate"
                  color={course.progress < 100 ? "warning" : "success"}
                  value={course.progress}
                  sx={{ mb: 2 }}
                />

                <Button
                  component={Link}
                  href={`${navigation.learn.href}/${course.id}`}
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
