"use client";

import { Button, Card, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export function CallToBuyAction({ courseId }: { courseId: string }) {
  const router = useRouter();
  // const isLoggedIn = false;

  const handleBuy = () => {
    // if (!isLoggedIn) {
    //   router.push(`/auth/login?redirect=/checkout?courseId=${courseId}`);
    // } else {
    //   router.push(`/checkout?courseId=${courseId}`);
    // }
    router.push(`/checkout?courseId=${courseId}`);
  };

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card sx={{ p: 3, borderRadius: 4, position: "sticky", top: 100 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Enroll in this course
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Get full access to all lessons, downloadable resources, and future
          updates.
        </Typography>
        <Button variant="contained" size="large" fullWidth onClick={handleBuy} >
          Buy Now
        </Button>
      </Card>
    </Grid>
  );
}
