"use client";

import { useCallback, useState } from "react";
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Dialog,
  Alert,
  DialogContent,
  Autocomplete,
} from "@mui/material";
import { CategoryWithCourseCountResponse, UpdateCategoryDto } from "@/types/api/api-types";
import { useToast } from "@/providers/ToastProvider";
import * as MuiIcons from "@mui/icons-material";
import { COURSE_CATEGORY_ICON_NAMES } from "@/data/course-category-icon-names";
import { categoryAPI } from "@/services/categories";

type IconName = keyof typeof MuiIcons;

type CategoryFormMode = "create" | "update";

type PropsType = {
  mode: CategoryFormMode;
  open: boolean;
  onClose: () => void;
  initialData?: CategoryWithCourseCountResponse;
  onCategoryChange: (category: CategoryWithCourseCountResponse) => void;
};

export function CategoryFormDialog({
  mode,
  open,
  onClose,
  initialData,
  onCategoryChange,
}: PropsType) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [icon, setIcon] = useState<IconName>(
    (initialData?.icon as IconName) ?? ""
  );
  const [inputErrorMessages, setInputErrorMessages] = useState<{
    nameErrorMessage: string;
    iconErrorMessage: string;
  }>({
    nameErrorMessage: "",
    iconErrorMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const validateCategoryForm = useCallback((): boolean => {
    let isValid = true;

    if (!name || name.trim().length < 1) {
      setInputErrorMessages((prev) => ({
        ...prev,
        nameErrorMessage: "Category name is required",
      }));
      isValid = false;
    } else {
      setInputErrorMessages((prev) => ({ ...prev, nameErrorMessage: "" }));
    }

    if (!icon) {
      setInputErrorMessages((prev) => ({
        ...prev,
        iconErrorMessage: "Icon is required",
      }));
      isValid = false;
    } else {
      setInputErrorMessages((prev) => ({
        ...prev,
        iconErrorMessage: "",
      }));
    }

    return isValid;
  }, [icon, name]);

  const handleSubmit = useCallback(async () => {
    if (!validateCategoryForm()) return;

    setError("");
    setLoading(true);
    try {
      let category: CategoryWithCourseCountResponse;
      if (mode === "create") {
        category = await categoryAPI.createCategory({
          name: name.trim(),
          icon,
        });
        showToast("Created category successfully", "success");
      } else {
        if (!initialData) return;
        if (initialData.name === name && initialData.icon === icon) return;

        const updateCategoryDto: UpdateCategoryDto = {
          ...(initialData.name !== name && { name }),
          ...(initialData.icon !== icon && { icon }),
        };

        category = await categoryAPI.updateCategory(
          initialData.id,
          updateCategoryDto
        );
        showToast("Updated category successfully", "success");
      }

      onCategoryChange({
        id: category.id,
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        courseCount: category.courseCount,
      });
      onClose();
    } catch (err) {
      console.error(err);
      setError(`Failed to ${mode} category`);
    } finally {
      setLoading(false);
    }
  }, [
    initialData,
    mode,
    onClose,
    onCategoryChange,
    showToast,
    icon,
    name,
    validateCategoryForm,
  ]);

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          {mode === "update" ? "Edit Lesson" : "Add Lesson"}
        </Typography>

        {!!error && (
          <Alert security="error" color="error" variant="filled" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Category name"
          value={name}
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
          error={!!inputErrorMessages.nameErrorMessage}
          helperText={inputErrorMessages.nameErrorMessage}
          sx={{ mb: 2 }}
        />

        <Autocomplete<IconName>
          options={COURSE_CATEGORY_ICON_NAMES}
          value={icon}
          disabled={loading}
          onChange={(_, value) => value && setIcon(value)}
          renderOption={(props, option) => {
            const Icon = MuiIcons[option as IconName];
            return (
              <li {...props} key={option}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Icon fontSize="small" />
                  <span>{option}</span>
                </Stack>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              error={!!inputErrorMessages.iconErrorMessage}
              helperText={inputErrorMessages.iconErrorMessage}
              {...params}
              label="Icon"
            />
          )}
        />

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            disabled={loading}
            onClick={onClose}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
