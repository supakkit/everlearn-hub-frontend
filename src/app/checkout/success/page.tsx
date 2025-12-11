"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { CentralScreenContainer } from "@/components/common/CentralScreenContainer";
import { paymentAPI } from "@/services/payment";
import { navigation } from "@/data/navigation";
import { CheckoutSessionResponse } from "@/types/api/api-types";
import Image from "next/image";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [checkoutSession, setCheckoutSession] =
    useState<CheckoutSessionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPayment = async (sessionId: string) => {
    try {
      setLoading(true);
      const checkoutSession = await paymentAPI.getCheckoutSession(sessionId);
      setCheckoutSession(checkoutSession);
    } catch (err) {
      console.error("Failed to fetch purchased course:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) fetchPayment(sessionId);
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
        {!loading && checkoutSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              elevation={4}
              sx={{
                mt: 6,
                borderRadius: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <CardContent sx={{ mx: "auto" }}>
                <Image
                  src={checkoutSession.image}
                  alt={checkoutSession.title}
                  width={150}
                  height={150}
                  className="rounded-2xl"
                />
              </CardContent>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 2,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ lineClamp: 2 }}
                >
                  {checkoutSession.title}
                </Typography>

                <Typography variant="h5" fontWeight={800} color="textSecondary">
                  {checkoutSession.amountPaid}฿
                </Typography>

                <Stack direction="row" gap={2} sx={{ mt: "auto", ml: "auto" }}>
                  <Button
                    variant="outlinedDarkMode"
                    size="large"
                    // fullWidth
                    sx={{
                      mt: "auto",
                      width: 180,
                      display: { xs: "none", md: "block" },
                    }}
                    onClick={() => router.push(`${navigation.dashboard.href}`)}
                  >
                    My Dashboard
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ width: 180 }}
                    onClick={() =>
                      router.push(
                        `${navigation.learn.href}/${checkoutSession.courseId}`
                      )
                    }
                  >
                    Start Learning
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* If backend fails */}
        {!loading && !checkoutSession && (
          <Typography color="error" textAlign="center" mt={4}>
            Unable to load your course. Please contact support.
          </Typography>
        )}
      </Container>
    </CentralScreenContainer>
  );
}
