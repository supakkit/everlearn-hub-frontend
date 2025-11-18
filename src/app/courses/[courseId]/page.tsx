import React from "react";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Chip, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { courses } from "@/data/courses";
import { CallToBuyAction } from "@/components/courses/CallToBuyAction";

interface CourseDetailPageProps {
  params: {
    courseId: string;
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;


  const session = '';  // assume 

  const course = courses.find(course => String(course.id) === courseId);

  const handleBuy = () => {
    if (!session) {
      
    }
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <Container maxWidth="lg" className="py-10">
      <Grid container spacing={4}>
        {/* Left: Course Info */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {course.title}
          </Typography>
          <Chip label={course.category} sx={{ mb: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {course.description}
          </Typography>

          <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 4 }}>
            <CardMedia component="img" height="320" image={course.image} alt={course.title} />
          </Card>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Lessons
          </Typography>

          <List>
            {course.lessons.map((lesson) => (
              <React.Fragment key={lesson.id}>
                <ListItem
                  // button={lesson.preview}
                  // disabled={!lesson.preview}
                  sx={{ opacity: lesson.preview ? 1 : 0.5 }}
                >
                  <ListItemIcon>
                    {lesson.preview ? <PlayCircleIcon /> : <LockIcon />}
                  </ListItemIcon>
                  <ListItemText primary={lesson.title} />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Grid>

        {/* Right: Call to Action */}
        <CallToBuyAction courseId={courseId} />
      </Grid>
    </Container>
  );
}
