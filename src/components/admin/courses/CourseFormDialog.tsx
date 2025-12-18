"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
  FormControlLabel,
  MenuItem,
  Avatar,
  Alert,
  Dialog,
  DialogContent,
} from "@mui/material";
import {
  CourseResponse,
  CreateCourseDto,
  UpdateCourseDto,
} from "@/types/api/api-types";
import { useInitialData } from "@/providers/InitialDataProvider";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";
import { useToast } from "@/providers/ToastProvider";

type CourseFormMode = "create" | "update";

type FormByMode<M extends CourseFormMode> = M extends "create"
  ? CreateCourseDto
  : UpdateCourseDto;

type ImageByMode<M extends CourseFormMode> = M extends "create"
  ? File
  : File | null;

type PropsType<M extends CourseFormMode> = {
  mode: M;
  initialData: CreateCourseDto;
  initialImage?: string;
  submitLabel: string;
  onSubmit: (
    form: FormByMode<M>,
    imageFile: ImageByMode<M>
  ) => Promise<CourseResponse>;
  open: boolean;
  onClose: () => void;
};

export function CourseFormDialog<M extends CourseFormMode>({
  mode,
  initialData,
  initialImage,
  submitLabel,
  onSubmit,
  open,
  onClose,
}: PropsType<M>) {
  const router = useRouter();
  const { showToast } = useToast();

  const { categories } = useInitialData();
  const [form, setForm] = useState<CreateCourseDto | UpdateCourseDto>(
    initialData
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputErrorMessages, setInputErrorMessages] = useState({
    titleErrorMessage: "",
    descriptionErrorMessage: "",
    priceBahtErrorMessage: "",
    categoryIdErrorMessage: "",
    imageFileErrorMessage: "",
  });

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  useEffect(() => {
    setPreview(initialImage ?? null);
  }, [initialImage]);

  const validateCourseForm = (): boolean => {
    let isValid = true;

    if (!form.title || form.title.trim().length < 1) {
      setInputErrorMessages((prev) => ({
        ...prev,
        titleErrorMessage: "Title is required",
      }));
      isValid = false;
    } else {
      setInputErrorMessages((prev) => ({ ...prev, titleErrorMessage: "" }));
    }

    if (!form.description || form.description.trim().length < 1) {
      setInputErrorMessages((prev) => ({
        ...prev,
        descriptionErrorMessage: "Description is required",
      }));
      isValid = false;
    } else {
      setInputErrorMessages((prev) => ({
        ...prev,
        descriptionErrorMessage: "",
      }));
    }

    if (!form.categoryId) {
      setInputErrorMessages((prev) => ({
        ...prev,
        categoryIdErrorMessage: "Category is required",
      }));
      isValid = false;
    } else {
      setInputErrorMessages((prev) => ({
        ...prev,
        categoryIdErrorMessage: "",
      }));
    }
    if (form.priceBaht === undefined || form.priceBaht < 0) {
      setInputErrorMessages((prev) => ({
        ...prev,
        priceBahtErrorMessage: "Price must be greater than 0",
      }));
      isValid = false;
    } else {
      setInputErrorMessages((prev) => ({ ...prev, priceBahtErrorMessage: "" }));
    }

    if (mode === "create" && !imageFile) {
      setInputErrorMessages((prev) => ({
        ...prev,
        imageFileErrorMessage: "Course image is required",
      }));
      isValid = false;
    } else {
      setInputErrorMessages((prev) => ({ ...prev, imageFileErrorMessage: "" }));
    }

    return isValid;
  };

  const handleChange = <K extends keyof CreateCourseDto>(
    key: K,
    value: CreateCourseDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!validateCourseForm()) return;
    setError("");
    setLoading(true);
    try {
      const course = await onSubmit(
        form as FormByMode<M>,
        imageFile as ImageByMode<M>
      );
      showToast(
        `${mode === "create" ? "Created" : "Updated"} course successfully`,
        "success"
      );
      onClose();
      router.push(`${navigation.admin.preview.courses.href}/${course.id}`);
    } catch (err) {
      console.error(err);
      setError(`Failed to ${mode === "create" ? "created" : "updated"} course`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ borderRadius: 2, p: 1 }}>
      {!!error && (
        <Alert security="error" color="error" variant="filled" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}
      <DialogContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          {mode === "create" ? "Create Course" : "Edit Course"}
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Course Title"
              value={form.title}
              disabled={loading}
              onChange={(e) => {
                const title = e.target.value;
                handleChange("title", title);
              }}
              error={!!inputErrorMessages.titleErrorMessage}
              helperText={inputErrorMessages.titleErrorMessage}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Category"
              value={form.categoryId}
              disabled={loading}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              error={!!inputErrorMessages.categoryIdErrorMessage}
              helperText={inputErrorMessages.categoryIdErrorMessage}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={form.description}
              disabled={loading}
              onChange={(e) => handleChange("description", e.target.value)}
              error={!!inputErrorMessages.descriptionErrorMessage}
              helperText={inputErrorMessages.descriptionErrorMessage}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography fontWeight={600} mb={1}>
              Course Image
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                variant="rounded"
                src={preview ?? undefined}
                sx={{ width: 96, height: 96 }}
              />
              <Button
                disabled={loading}
                component="label"
                variant="outlinedDarkMode"
              >
                Select Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setImageFile(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </Button>
            </Box>
            {!!inputErrorMessages.imageFileErrorMessage && (
              <Alert
                severity="error"
                color="error"
                sx={{ width: "fit-content", my: 1 }}
              >
                {inputErrorMessages.imageFileErrorMessage}
              </Alert>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Price (Baht)"
              value={form.priceBaht}
              disabled={loading}
              onChange={(e) =>
                handleChange("priceBaht", Number(e.target.value))
              }
              error={!!inputErrorMessages.priceBahtErrorMessage}
              helperText={inputErrorMessages.priceBahtErrorMessage}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={form.isFree}
                  disabled={loading}
                  onChange={(e) => handleChange("isFree", e.target.checked)}
                />
              }
              label="Free Course"
              sx={{ mr: 5 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={form.isPublished}
                  disabled={loading}
                  onChange={(e) =>
                    handleChange("isPublished", e.target.checked)
                  }
                />
              }
              label="Published"
            />
          </Grid>

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              disabled={loading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleSubmit}
            >
              {submitLabel}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
