"use client";

import { customerBenefits } from "@/data/customerBenefits";
import {
  Button,
  Card,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export function BuyBox({ courseId }: { courseId: string }) {
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
    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
      <Card sx={{ p: 3, position: "sticky", top: 100, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Enroll in this course
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Unlock every lesson, quizzes, downloadable resources, and lifetime
          updates.
        </Typography>

        {/* Value highlights */}
        <List dense sx={{ mb: 3 }}>
          {customerBenefits.map((item, index) => (
            <ListItemButton
              key={index}
              disableRipple
              sx={{ cursor: "default" }}
            >
              <ListItemIcon>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItemButton>
          ))}
        </List>

        {/* Pomotion */}
        <Paper
          elevation={0}
          sx={{ p: 2, mb: 3, bgcolor: "grey.100", borderRadius: 2 }}
        >
          <Typography variant="body2" fontWeight="bold">
            7-Day Money Back Guarantee
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Try the course risk-free. Refund available within 7 days after
            purchase.
          </Typography>
        </Paper>

        <Typography variant="h6" sx={{ mb: 2, textAlign: "right" }}>
          2222 Baht
        </Typography>

        <Button variant="contained" size="large" fullWidth>
          Buy Now
        </Button>
      </Card>
    </Grid>
  );
}
