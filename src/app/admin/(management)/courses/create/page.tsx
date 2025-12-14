"use client";

import { CourseForm } from "@/components/admin/courses/CourseForm";
import { courseAPI } from "@/services/courses";
import { CreateCourseDto } from "@/types/api/api-types";
import { Box, Typography } from "@mui/material";

export default function CreateCoursePage() {
  const initialData: CreateCourseDto = {
    title: "",
    description: "",
    categoryId: "",
    isFree: false,
    priceBaht: 0,
    isPublished: false,
  };

  const handleCreateCourse = async (form: CreateCourseDto, imageFile: File) => {
    const formData = new FormData();
    type KeyOfFormData = keyof CreateCourseDto;

    Object.keys(form).forEach((key) => {
      formData.append(key, String(form[key as KeyOfFormData]));
    });
    formData.append("imageFile", imageFile);

    return courseAPI.createCourse(formData);
  };

  return (
    <Box px={4} maxWidth={900} mx="auto">
      <Typography variant="h4" textAlign="center" fontWeight={600} mb={2}>
        Create Course
      </Typography>
      <CourseForm
        mode="create"
        initialData={initialData}
        submitLabel="Create Course"
        onSubmit={handleCreateCourse}
      />
    </Box>
  );
}
