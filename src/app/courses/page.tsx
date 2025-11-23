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
import { courses as mockCourses } from "@/data/courses";
import { courseCategories } from "@/data/courseCategories";
import { navigation } from "@/data/navigation";
import { useCallback, useEffect, useState } from "react";
import { Course } from "@/types/course";
import { getSlug } from "@/config/slugify";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [queryInput, setQueryInput] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "";

  const itemsPerPage = 10;
  const totalItems = 10; // get from server response
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const updateFilter = (key: string, value: string) => {
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
    const query = queryInput.trim();
    if (query) updateFilter("query", query);
    setQueryInput("");
  };

  const fetchCourses = useCallback(() => {
    const filteredCourses = mockCourses.filter((course) => {
      console.log("getSlug:", getSlug(course.category));
      const matchesCategory =
        category === "all" || getSlug(course.category) === category;
      const matchesSearch = course.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const paginatedCourses = filteredCourses.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return paginatedCourses;
  }, [page, category, query]);

  useEffect(() => {
    let ignore = false;
    const getData = () => {
      const data = fetchCourses();
      if (!ignore) {
        setCourses(data || []);
      }
    };
    getData();

    return () => {
      ignore = true;
    };
  }, [page, category, query, fetchCourses]);

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
          display: query.trim() === "" ? "none" : "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">Recent search:</Typography>
        <Chip
          label={query}
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
          name="query"
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
        {courseCategories.map((item) => (
          <Chip
            key={item.slug}
            label={item.title}
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

      {courses.length === 0 && (
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
