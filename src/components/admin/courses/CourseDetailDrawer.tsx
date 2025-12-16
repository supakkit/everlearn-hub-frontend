"use client";

import {
  CourseWithLessonsResponse,
  OverviewLessonResponse,
} from "@/types/api/api-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { LessonManagement } from "./LessonManagement";
import { useMemo, useState } from "react";

type PropsType = {
  course: CourseWithLessonsResponse | null;
  handleCloseDrawer: () => void;
  handleDeleteCourse: (courseId: string) => void;
  deleteCourseLoading: boolean;
  onLessonsChange: (
    courseId: string,
    lessons: OverviewLessonResponse[]
  ) => void;
};

export function CourseDetailDrawer({
  course,
  handleCloseDrawer,
  handleDeleteCourse,
  deleteCourseLoading,
  onLessonsChange,
}: PropsType) {
  const [interactionLocked, setInteractionLocked] = useState(false);
  
  const isLocked: boolean = useMemo(
    () => deleteCourseLoading || interactionLocked,
    [deleteCourseLoading, interactionLocked]
  );
  return (
    <Drawer
      anchor="right"
      open={!!course}
      onClose={handleCloseDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: { xs: "90%", md: "50%" },
          p: 2,
        },
      }}
    >
      {course && (
        <Box>
          <Avatar
            variant="rounded"
            src={course.imageUrl}
            sx={{ width: "100%", height: 200, mb: 2 }}
          />

          <Typography variant="h5" fontWeight={600}>
            {course.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {course.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Info label="Slug" value={course.slug} />
            <Info label="Category" value={course.categoryName} />
            <Info
              label="Price"
              value={course.isFree ? "Free" : `${course.priceBaht} Baht`}
            />
            <Info
              label="Status"
              value={course.isPublished ? "Published" : "Draft"}
            />
            <Info
              label="Created"
              value={new Date(course.createdAt).toDateString()}
            />
          </Stack>

          <Divider sx={{ my: 3 }} />

          <LessonManagement
            course={course}
            onLessonsChange={onLessonsChange}
            disabled={isLocked}
            onLoadingChange={setInteractionLocked}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Link
              href={`${navigation.admin.preview.courses.href}/${course.id}`}
              className="w-full"
            >
              <Button
                fullWidth
                variant="outlined"
                color="success"
                size="large"
                disabled={isLocked}
              >
                Preview
              </Button>
            </Link>
            <Link
              href={`${navigation.admin.courses.href}/${course.id}/edit`}
              className="w-full"
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={isLocked}
              >
                Edit
              </Button>
            </Link>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              disabled={isLocked}
              onClick={() => handleDeleteCourse(course.id)}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
}
