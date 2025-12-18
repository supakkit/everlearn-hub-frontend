"use client";

import { courseAPI } from "@/services/courses";
import { CreateCourseDto, UpdateCourseDto } from "@/types/api/api-types";
import { Alert } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CourseFormDialog } from "./CourseFormDialog";

type PropsType = {
  courseId: string;
  open: boolean;
  onClose: () => void;
};

export function EditCourse({ courseId, open, onClose }: PropsType) {
  const [course, setCourse] = useState<CreateCourseDto>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourse = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const course = await courseAPI.getOneByAdmin(courseId);
      setCourse({
        title: course.title,
        description: course.description,
        isFree: course.isFree,
        priceBaht: course.priceBaht,
        isPublished: course.isPublished,
        categoryId: course.categoryId,
      });
      setImageUrl(course.imageUrl);
    } catch (err) {
      setError("Failed to fetch course");
      console.error("Failed to fetch course:", err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const handleUpdateCourse = async (
    form: UpdateCourseDto,
    imageFile: File | null
  ) => {
    if (!course) throw new Error("Course not found");

    const formData = new FormData();
    type KeyOfFormData = keyof CreateCourseDto;

    Object.keys(form).forEach((key) => {
      const value = form[key as KeyOfFormData];
      if (value !== course[key as KeyOfFormData]) {
        formData.append(key, String(value));
      }
    });

    if (imageFile) formData.append("imageFile", imageFile);

    return courseAPI.updateCourse(courseId, formData);
  };

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading && !course) return null;

  if (!course || error)
    return (
      <Alert
        severity="error"
        color="error"
        sx={{ width: "fit-content", px: 3, fontWeight: 500, mt: 2, mx: "auto" }}
      >
        {error || "Course not found"}
      </Alert>
    );

  return (
    <CourseFormDialog
      mode="update"
      initialData={course}
      initialImage={imageUrl}
      submitLabel="Save Changes"
      onSubmit={handleUpdateCourse}
      open={open}
      onClose={onClose}
    />
  );
}
