import { customerBenefits } from "@/data/customerBenefits";
import { CourseResponse } from "@/types/api/api-types";
import {
  Button,
  Card,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type PropType = {
  course: CourseResponse;
  handleBuy: (courseId: string, isFree: boolean) => Promise<void>;
  buyLoading: boolean;
};

export function BuyBox({ course, handleBuy, buyLoading }: PropType) {
  return (
    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
      <Card sx={{ p: 3, position: "sticky", top: 100, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Enroll in this course
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Unlock every lesson, quizzes, downloadable resources, and lifetime
          updates.
        </Typography>

        {/* Value highlights */}
        <List dense sx={{ mb: 3 }}>
          {customerBenefits.map((item, index) => (
            <ListItemButton
              key={index}
              disableRipple
              sx={{ cursor: "default" }}
            >
              <ListItemIcon>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItemButton>
          ))}
        </List>

        {/* Pomotion */}
        <Paper
          elevation={0}
          sx={{ p: 2, mb: 3, bgcolor: "background.default", borderRadius: 2 }}
        >
          <Typography variant="body2" fontWeight="bold">
            7-Day Money Back Guarantee
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Try the course risk-free. Refund available within 7 days after
            purchase.
          </Typography>
        </Paper>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Price:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {course.isFree ? "Free" : `${course.priceBaht} Baht`}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={buyLoading}
          onClick={() => handleBuy(course.id, course.isFree)}
        >
          {course.isFree ? "Enroll Now" : "Buy Now"}
        </Button>
      </Card>
    </Grid>
  );
}
