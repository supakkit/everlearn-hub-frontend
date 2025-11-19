"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  // Mock data — replace with backend data later
  const user = { name: "John Doe" };
  const stats = {
    enrolled: 4,
    completedLessons: 32,
    hours: 12.5,
  };

  const enrolledCourses = [
    {
      id: "course_1",
      title: "React for Beginners",
      progress: 45,
    },
    {
      id: "course_2",
      title: "Next.js Mastery",
      progress: 80,
    },
  ];

  return (
    <Container sx={{ py: 6 }}>
      {/* Welcome */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome back, {user.name} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Here&apos;s your learning progress summary.
        </Typography>
      </motion.div>

      {/* Stats cards */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Courses Enrolled", value: stats.enrolled },
          { label: "Lessons Completed", value: stats.completedLessons },
          { label: "Learning Hours", value: stats.hours },
        ].map((s, i) => (
          <Grid size={{ xs: 12, sm: 4 }} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {s.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {s.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Enrolled Courses */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Continue Learning
      </Typography>

      <Grid container spacing={3}>
        {enrolledCourses.map((course, i) => (
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
                    value={course.progress}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    component={Link}
                    href={`/learn/${course.id}`}
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

      {/* Navigation buttons */}
      <Box mt={5} display="flex" gap={2}>
        <Button variant="outlinedDarkMode" component={Link} href="/learn">
          Go to Library
        </Button>

        <Button variant="outlinedDarkMode" component={Link} href="/profile">
          Profile Settings
        </Button>
      </Box>
    </Container>
  );
}
