"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
  TextField,
  Pagination,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courses/CourseCard";
import { navigation } from "@/data/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInitialData } from "@/providers/InitialDataProvider";
import { courseAPI } from "@/services/courses";
import { AllCoursesResponse, GetCourseParams } from "@/types/api/api-types";
import { mapCategoryNames } from "@/utils/mapCategoryNames";

type ParamsKeys = keyof NonNullable<GetCourseParams>;

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [queryInput, setQueryInput] = useState("");
  const [courses, setCourses] = useState<AllCoursesResponse["courses"]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { categories } = useInitialData();
  const courseCategoryNames = useMemo(
    () => mapCategoryNames(categories),
    [categories]
  );

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const updateFilter = (key: ParamsKeys, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key !== "page") params.set("page", "1");
    router.push(`${navigation.courses.href}?${params.toString()}`);
  };

  const handleClearFilter = () => {
    router.push(navigation.courses.href);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (queryInput.trim()) updateFilter("search", queryInput.trim());
    setQueryInput("");
  };

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const paramsObject: GetCourseParams = {
        page: String(page),
        limit: String(ITEMS_PER_PAGE),
      };

      if (category !== "all") paramsObject.category = category;
      if (search.trim() !== "") paramsObject.search = search;

      const { courses, total } = await courseAPI.getAll(paramsObject);
      setCourses(courses);
      setTotalItems(total);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  }, [page, category, search]);

  useEffect(() => {
    fetchCourses();
  }, [page, category, search, fetchCourses]);

  return (
    <Container className="min-h-screen offset-top-bar pt-22 relative pb-24">
      {/* Header */}
      <Typography
        component={motion.h1}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        variant="h4"
        fontWeight={700}
        mb={2}
      >
        Explore Courses
      </Typography>

      {/* The Search Keyword */}
      <Box
        sx={{
          my: 2,
          display: search.trim() === "" ? "none" : "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">Recent search:</Typography>
        <Chip
          label={search}
          onDelete={handleClearFilter}
          sx={{ fontSize: 15, fontWeight: 500 }}
        />
      </Box>

      {/* Search & Filter */}
      <Stack
        component="form"
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={2}
        onSubmit={handleSearchSubmit}
      >
        <TextField
          variant="outlined"
          type="text"
          name="search"
          placeholder="Search courses..."
          fullWidth
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
        />
        <Button variant="contained" size="large" type="submit">
          Search
        </Button>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        mb={4}
        sx={{ overflowX: "auto", py: 1 }}
      >
        {courseCategoryNames.map((item) => (
          <Chip
            key={item.slug}
            label={item.name}
            clickable
            onClick={() => updateFilter("category", item.slug)}
            color={category === item.slug ? "primary" : "default"}
          />
        ))}
      </Stack>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid
            key={course.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full w-fit"
            >
              <CourseCard course={course} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Typography mt={4} textAlign="center">
          Loading courses...
        </Typography>
      )}

      {!loading && error && (
        <Typography mt={4} textAlign="center">
          {error}
        </Typography>
      )}

      {loading && courses.length === 0 && (
        <Typography mt={4} textAlign="center" color="text.secondary">
          No courses found.
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          showFirstButton={true}
          showLastButton={true}
          onChange={(_, value) => updateFilter("page", String(value))}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
}
