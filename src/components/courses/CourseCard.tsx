"use client";

import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Course } from "@/data/courses";
import Link from "next/link";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full"
      >
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "0.3s ease",
            "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
          }}
        >
          <CardMedia
            component="img"
            height="160"
            image={course.image}
            alt={course.title}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {course.title}
            </Typography>
            <Chip label={course.category} size="small" sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {course.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ marginTop: "auto" }}>
            <Button
              component={Link}
              href={`/courses/${course.id}`}
              size="small"
              variant="contained"
              fullWidth
            >
              View Course
            </Button>
          </CardActions>
        </Card>
      </motion.div>
    </Grid>
  );
}
