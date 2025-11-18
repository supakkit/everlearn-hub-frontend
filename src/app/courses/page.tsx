"use client";

import { Suspense, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Stack,
  TextField,
  Pagination,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";

const filterOptions = [
  "All",
  "Web Development",
  "Design",
  "Business",
  "Lifestyle",
];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "All";
  const query = searchParams.get("query") || "";

  const itemsPerPage = 1;
  const totalItems = 10; // get from server response
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    // params.set("page", "1"); // reset page on filter change
    router.push(`/courses?${params.toString()}`);
  };

  const handleSearchSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    alert("send request");
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = category === "All" || course.category === category;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedCourses = filteredCourses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container sx={{ py: 6 }}>
      {/* Header */}
      <Typography
        component={motion.h1}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Explore Courses
      </Typography>

      {/* Search & Filter */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search courses..."
          fullWidth
          value={query}
          onChange={(e) => updateFilter("query", e.target.value)}
        />
        <Button variant="contained" size="large" onClick={handleSearchSubmit}>
          Search
        </Button>
      </Stack>
      <Stack direction="row" spacing={1} mb={4} sx={{ overflowX: "auto" }}>
        {filterOptions.map((f) => (
          <Chip
            key={f}
            label={f}
            clickable
            onClick={() => updateFilter("category", f)}
            color={category === f ? "primary" : "default"}
          />
        ))}
      </Stack>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {paginatedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Grid>

      {filteredCourses.length === 0 && (
        <Typography mt={4} textAlign="center" color="text.secondary">
          No courses found.
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          showFirstButton={true}
          onChange={(_, value) => updateFilter("page", String(value))}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
}
