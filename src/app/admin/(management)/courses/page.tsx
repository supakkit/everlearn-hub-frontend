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
  Chip,
  Button,
  IconButton,
  TablePagination,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CourseDetailDrawer } from "@/components/admin/courses/CourseDetailDrawer";
import { CourseWithLessonsResponse, OverviewLessonResponse } from "@/types/api/api-types";
import { courseAPI } from "@/services/courses";
import { CourseOverviewSkeleton } from "@/components/admin/courses/CourseOverviewSkeleton";
import { useToast } from "@/providers/ToastProvider";
import { navigation } from "@/data/navigation";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

export default function CourseOverviewPage() {
  const [courses, setCourses] = useState<CourseWithLessonsResponse[]>([]);
  const [selected, setSelected] = useState<CourseWithLessonsResponse | null>(
    null
  );
  const [totalItems, setTotalItems] = useState(10);
  const [loading, setLoading] = useState(false);
  const [deleteCourseLoading, setDeleteCourseLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();
  const { showToast } = useToast();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fetchCourses = useCallback(
    async (page: number = 1, rowsPerPage: number = 5) => {
      setLoading(true);
      setError("");
      try {
        const { courses, total } =
          await courseAPI.getAllCoursesWithLessonsByAdmin({
            page: String(page),
            limit: String(rowsPerPage),
          });
        setCourses(courses);
        setTotalItems(total);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteCourse = async (courseId: string) => {
    const confirm = window.confirm("Are you sure to delete this course?");
    if (!confirm) return;
    setDeleteCourseLoading(true);
    try {
      await courseAPI.deleteCourse(courseId);
      setSelected(null);
      fetchCourses(1, rowsPerPage);
      showToast("Deleted course successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete course", "error");
    } finally {
      setDeleteCourseLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page, rowsPerPage);
  }, [page, rowsPerPage, fetchCourses]);

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
          Courses
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          href={`${navigation.admin.courses.href}/create`}
        >
          Create Course
        </Button>
      </Box>

      {/* Course Table */}
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
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Lessons</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ opacity: loading ? 0.5 : 1 }}>
            {courses.map((course, index) => (
              <TableRow
                key={course.id}
                hover
                onClick={() => {
                  setSelected(course);
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.categoryName}</TableCell>
                <TableCell align="center">
                  {course.isFree ? "Free" : `${course.priceBaht}฿`}
                </TableCell>
                <TableCell align="center">{course.lessons.length}</TableCell>
                <TableCell align="center">
                  {course.isPublished ? (
                    <Chip label="Published" color="success" size="small" />
                  ) : (
                    <Chip label="Draft" size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={(e) => {
                      router.push(
                        `${navigation.admin.preview.courses.href}/${course.id}`
                      );
                      e.stopPropagation();
                    }}
                    title="preview"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    title="edit"
                    onClick={(e) => {
                      router.push(
                        `${navigation.admin.courses.href}/${course.id}/edit`
                      );
                      e.stopPropagation();
                    }}
                  >
                    <EditNoteRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 0 }}>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <CourseDetailDrawer
        course={selected}
        handleCloseDrawer={() => setSelected(null)}
        handleDeleteCourse={handleDeleteCourse}
        deleteCourseLoading={deleteCourseLoading}
        onLessonsChange={(courseId: string, lessons: OverviewLessonResponse[]) =>
          setCourses((prev) =>
            prev.map((course) =>
              course.id === courseId
                ? { ...course, lessons }
                : course
            )
          )
        }
      />
    </Box>
  );
}
