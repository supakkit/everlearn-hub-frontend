"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { CentralScreenContainer } from "@/components/common/CentralScreenContainer";

type PurchasedCourse = {
  id: string;
  title: string;
  image: string;
};

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [course, setCourse] = useState<PurchasedCourse | null>(null);
  const [loading, setLoading] = useState(false);

  // Later: Replace with real backend call to verify Stripe session
  const fetchPurchasedCourse = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock purchased data — replace after connecting backend
      setCourse({
        id: "course_123",
        title: "Mastering React for Beginners",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchPurchasedCourse();
  }, [sessionId]);

  return (
    <CentralScreenContainer>
      <Container maxWidth="md" sx={{ py: 12 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box textAlign="center">
            <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
            <Typography variant="h4" fontWeight="bold" mt={2}>
              Payment Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Thank you for your purchase. Your course is now available.
            </Typography>
          </Box>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={6}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Course Card */}
        {!loading && course && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              elevation={4}
              sx={{
                mt: 6,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />

              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {course.title}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 3, py: 1.5 }}
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* If backend fails */}
        {!loading && !course && (
          <Typography color="error" textAlign="center" mt={4}>
            Unable to load your course. Please contact support.
          </Typography>
        )}
      </Container>
    </CentralScreenContainer>
  );
}
