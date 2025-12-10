import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { AllCoursesResponse } from "@/types/api/api-types";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";
import SellRoundedIcon from '@mui/icons-material/SellRounded';

type PropsType = {
  course: AllCoursesResponse["courses"][number];
};

export function CourseCard({ course }: PropsType) {
  const router = useRouter();
  return (
    <Card
      key={course.id}
      onClick={() => {
        router.push(`${navigation.courses.href}/${course.id}`);
      }}
      sx={{
        height: 400,
        width: 250,
        minWidth: 250,
        display: "flex",
        flexDirection: "column",
        "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
        border: (theme) => `1px solid ${theme.palette.primary.light}`,
      }}
      elevation={0}
    >
      <CardMedia>
        <Box sx={{ width: "100%", height: 180, position: "relative" }}>
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </CardMedia>
      <CardContent sx={{ flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Chip label={course.categoryName} size="small" />
          <Typography
            variant="h6"
            fontWeight="medium"
            sx={{ textAlign: "right" }}
          >
            <SellRoundedIcon sx={{ fontSize: 18 }} />{" "}{course.isFree ? 'Free' : `${course.priceBaht}฿`}
          </Typography>
        </Stack>
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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
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
        <Button
          size="small"
          variant="contained"
          fullWidth
          sx={{ fontWeight: "bold" }}
          onClick={(e) => {
            router.push(`${navigation.checkout.href}/${course.id}`);
            e.stopPropagation();
          }}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
