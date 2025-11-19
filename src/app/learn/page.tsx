"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type EnrolledCourse = {
  id: string;
  title: string;
  image: string;
  progress: number; // 0-100%
};

export default function LibraryPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<EnrolledCourse[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock fetch function — replace with real API
  const fetchEnrolledCourses = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API
    setCourses([
      {
        id: "course_1",
        title: "Mastering React for Beginners",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80",
        progress: 40,
      },
      {
        id: "course_2",
        title: "TypeScript Essentials",
        image:
          "https://images.unsplash.com/photo-1612831455543-bc904be48292?q=80",
        progress: 70,
      },
      {
        id: "course_3",
        title: "Fullstack Node.js",
        image:
          "https://images.unsplash.com/photo-1590608897129-79d61de5e5b2?q=80",
        progress: 0,
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        My Courses
      </Typography>

      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Skeleton
                  variant="rectangular"
                  height={250}
                  animation="wave"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : courses?.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Progress: {course.progress}%
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ mt: "auto" }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => router.push(`/learn/${course.id}`)}
                      >
                        Continue Learning
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
      </Grid>

      {!loading && courses?.length === 0 && (
        <Typography textAlign="center" color="text.secondary" mt={6}>
          You haven’t enrolled in any courses yet.
        </Typography>
      )}
    </Container>
  );
}
