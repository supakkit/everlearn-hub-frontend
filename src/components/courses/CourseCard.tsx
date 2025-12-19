"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { AllCoursesResponse } from "@/types/api/api-types";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import { useCallback, useState } from "react";
import { paymentAPI } from "@/services/payment";
import { useToast } from "@/providers/ToastProvider";
import { useAuth } from "@/providers/AuthProvider";

type PropsType = {
  course: AllCoursesResponse["courses"][number];
};

export function CourseCard({ course }: PropsType) {
  const router = useRouter();
  const { showToast } = useToast();
  const { isAuthUser } = useAuth();
  const [buyLoading, setBuyLoading] = useState(false);

  const handleBuy = useCallback(
    async (courseId: string, isFree: boolean) => {
      if (!isAuthUser) router.push(navigation.login.href);

      setBuyLoading(true);
      try {
        if (isFree) {
          const enrollment = await paymentAPI.enrollFreeCourse(courseId);
          showToast("Enrolled course successfully", "success");
          router.push(`${navigation.learn.href}/${enrollment.courseId}`);
          return;
        }

        const { url } = await paymentAPI.buyCourse(courseId);

        if (!url) {
          alert("Unable to open Stripe Checkout. Please try again.");
          return;
        }

        window.location.href = url;
      } catch (err) {
        console.error(err);
      } finally {
        setBuyLoading(false);
      }
    },
    [router, showToast, isAuthUser]
  );

  return (
    <Card
      key={course.id}
      onClick={() => {
        router.push(`${navigation.courses.href}/${course.id}`);
      }}
      sx={{
        height: 400,
        width: 250,
        minWidth: 250,
        display: "flex",
        flexDirection: "column",
        "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
        border: (theme) => `1px solid ${theme.palette.primary.light}`,
      }}
      elevation={0}
    >
      <CardMedia>
        <Box sx={{ width: "100%", height: 180, position: "relative" }}>
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </CardMedia>
      <CardContent sx={{ flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Chip label={course.categoryName} size="small" />
          <Typography
            variant="h6"
            fontWeight="medium"
            sx={{ textAlign: "right" }}
          >
            <SellRoundedIcon sx={{ fontSize: 18 }} />{" "}
            {course.isFree ? "Free" : `${course.priceBaht}฿`}
          </Typography>
        </Stack>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          sx={{ fontWeight: "bold" }}
          disabled={buyLoading}
          onClick={(e) => {
            e.stopPropagation();
            handleBuy(course.id, course.isFree);
          }}
        >
          {course.isFree ? "Enroll" : "Buy"}
        </Button>
      </CardActions>
    </Card>
  );
}
