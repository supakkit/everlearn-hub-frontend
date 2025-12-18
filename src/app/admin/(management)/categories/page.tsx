"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import { CategoryWithCourseCountResponse } from "@/types/api/api-types";
import { CourseOverviewSkeleton } from "@/components/admin/courses/CourseOverviewSkeleton";
import { useToast } from "@/providers/ToastProvider";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import AddIcon from "@mui/icons-material/Add";
import { useInitialData } from "@/providers/InitialDataProvider";
import { categoryAPI } from "@/services/categories";
import * as MuiIcons from "@mui/icons-material";
import { CategoryFormDialog } from "@/components/admin/categories/CategoryFormDialog";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

type IconName = keyof typeof MuiIcons;

type CategoryFormState =
  | { mode: "create" }
  | { mode: "update"; category: CategoryWithCourseCountResponse }
  | null;

export default function CategoryManagementPage() {
  const { onCategoryChange } = useInitialData();
  const [categories, setCategories] = useState<
    CategoryWithCourseCountResponse[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [categoryFormState, setCategoryFormState] =
    useState<CategoryFormState>(null);

  const { showToast } = useToast();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await categoryAPI.getCategoriesWithCourseCount();
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDeleteCategory = async (categoryId: string) => {
    const confirm = window.confirm("Are you sure to delete this category?");
    if (!confirm) return;
    setLoading(true);
    try {
      const deletedCategory = await categoryAPI.removeCategory(categoryId);
      const updatedCategories = categories.filter(
        (cat) => cat.id !== deletedCategory.id
      );
      onCategoryChange(updatedCategories);
      setCategories(updatedCategories);
      showToast("Deleted category successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete course", "error");
    } finally {
      setLoading(false);
    }
  };

  const dynamicIcon = (iconName: IconName) => {
    const Icon = MuiIcons[iconName];
    return <Icon />;
  };

  if (loading) return <CourseOverviewSkeleton />;
  if (error)
    return (
      <Alert
        severity="error"
        color="error"
        sx={{ width: "fit-content", px: 3, fontWeight: 500, mt: 2, mx: "auto" }}
      >
        {error}
      </Alert>
    );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Category
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setCategoryFormState({ mode: "create" })}
        >
          Create Category
        </Button>
      </Box>

      {/* Category Table */}
      <TableContainer
        sx={{
          minHeight: 300,
          maxHeight: "60vh",
          overflowX: "auto",
          bgcolor: "background.paper",
        }}
      >
        <Table
          aria-label="Course management table"
          size="small"
          stickyHeader
          sx={{ minWidth: 900 }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Slug</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Icon Name</TableCell>
              <TableCell align="center">Linked Course</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ opacity: loading ? 0.5 : 1 }}>
            {categories.map((category, index) => (
              <TableRow key={category.id} hover>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell align="center">{category.slug}</TableCell>
                <TableCell align="center">
                  {dynamicIcon(category.icon as IconName)}
                </TableCell>
                <TableCell align="center">{category.icon}</TableCell>
                <TableCell align="center">{category.courseCount}</TableCell>
                <TableCell align="center">
                  <IconButton
                    title="edit"
                    onClick={(e) => {
                      setCategoryFormState({
                        mode: "update",
                        category: category,
                      });
                      e.stopPropagation();
                    }}
                  >
                    <EditNoteRoundedIcon />
                  </IconButton>
                  <IconButton
                    title="remove"
                    disabled={category.courseCount > 0}
                    onClick={(e) => {
                      handleDeleteCategory(category.id);
                      e.stopPropagation();
                    }}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {categoryFormState &&
        (categoryFormState.mode === "create" ? (
          <CategoryFormDialog
            mode="create"
            open
            onClose={() => setCategoryFormState(null)}
            onCategoryChange={(category) => {
              const updatedCategories = [...categories, category];
              onCategoryChange(updatedCategories);
              setCategories(updatedCategories);
            }}
          />
        ) : (
          <CategoryFormDialog
            mode="update"
            initialData={categoryFormState.category}
            open
            onClose={() => setCategoryFormState(null)}
            onCategoryChange={(category) => {
              const updatedCategories = categories.map((cat) =>
                cat.id === category.id ? category : cat
              );
              onCategoryChange(updatedCategories);
              setCategories(updatedCategories);
            }}
          />
        ))}
    </Box>
  );
}
