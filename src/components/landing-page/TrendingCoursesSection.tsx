"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

export function TrendingCoursesSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
        Trending Courses
      </Typography>

      <Box ref={emblaRef} sx={{ overflow: 'hidden' }} >
      <Box  sx={{ display: "flex", gap: 2, paddingLeft: 2 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <TrendingCourseCard key={i} imageId={i} />
        ))}
      </Box>
        </Box>
    </Container>
  );
}

function TrendingCourseCard({ imageId }: { imageId: number }) {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardMedia>
        <Box sx={{ width: "100%", height: 180, position: "relative" }}>
          <Image
            src={`https://picsum.photos/seed/${imageId}/500/300`}
            alt="Course"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          Course Title {imageId}
        </Typography>
        <Typography variant="body2" mb={2}>
          Short description of the course goes here.
        </Typography>
        <Button variant="contained" fullWidth>
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  );
}
