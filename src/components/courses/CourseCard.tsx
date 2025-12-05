import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/types/course";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card
      key={course.id}
      sx={{
        height: "100%",
        minWidth: 280,
        width: 280,
        display: "flex",
        flexDirection: "column",
        "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
        border: (theme) => `1px solid ${theme.palette.primary.light}`
      }}
      elevation={0}
    >
      <CardMedia>
        <Box sx={{ width: "100%", height: 180, position: "relative" }}>
          <Image
            src={course.image}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </CardMedia>
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.title}
        </Typography>
        <Chip label={course.category} size="small" sx={{ mb: 1 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button size="small" variant="contained" fullWidth>
            View Course
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
