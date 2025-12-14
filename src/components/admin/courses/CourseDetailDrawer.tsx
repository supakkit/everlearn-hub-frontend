import { CourseWithLessonsResponse } from "@/types/api/api-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

type PropsType = {
  course: CourseWithLessonsResponse | null;
  handleCloseDrawer: () => void;
  handleDeleteCourse: (courseId: string) => void;
  deleteCourseLoading: boolean;
};

export function CourseDetailDrawer({
  course,
  handleCloseDrawer,
  handleDeleteCourse,
  deleteCourseLoading,
}: PropsType) {
  return (
    <Drawer
      anchor="right"
      open={!!course}
      onClose={handleCloseDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: { xs: "90%", md: "50%" },
          p: 2,
        },
      }}
    >
      {course && (
        <Box>
          <Avatar
            variant="rounded"
            src={course.imageUrl}
            sx={{ width: "100%", height: 200, mb: 2 }}
          />

          <Typography variant="h5" fontWeight={600}>
            {course.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {course.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Info label="Slug" value={course.slug} />
            <Info label="Category" value={course.categoryName} />
            <Info
              label="Price"
              value={course.isFree ? "Free" : `${course.priceBaht} Baht`}
            />
            <Info
              label="Status"
              value={course.isPublished ? "Published" : "Draft"}
            />
            <Info
              label="Created"
              value={new Date(course.createdAt).toDateString()}
            />
          </Stack>

          <Divider sx={{ my: 3 }} />
          <Stack>
            <List disablePadding dense subheader="Lessons">
              {course.lessons.map((lesson) => (
                <ListItem
                  key={lesson.id}
                  component={Paper}
                  elevation={0}
                  sx={{
                    justifyContent: "flex-start",
                    my: 0.5,
                    bgcolor: "background.default",
                    borderRadius: 0.7,
                  }}
                  secondaryAction={
                    <IconButton size="small" color="warning" title="Edit">
                      <EditRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  }
                >
                  <ListItemIcon># {lesson.position}.</ListItemIcon>
                  <ListItemText primary={lesson.title} />
                </ListItem>
              ))}
            </List>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2}>
            <Link
              href={`${navigation.admin.preview.courses.href}/${course.id}`}
              className="w-full"
            >
              <Button
                fullWidth
                variant="outlined"
                color="success"
                size="large"
                disabled={deleteCourseLoading}
              >
                Preview
              </Button>
            </Link>
            <Link
              href={`${navigation.admin.courses.href}/${course.id}/edit`}
              className="w-full"
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={deleteCourseLoading}
              >
                Edit
              </Button>
            </Link>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              disabled={deleteCourseLoading}
              onClick={() => handleDeleteCourse(course.id)}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
}
