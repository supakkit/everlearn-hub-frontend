"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { courses } from "@/data/courses";
import { CourseCard } from "../courses/CourseCard";
import { motion } from "motion/react";

export function CoursesSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);
  return (
    <Box sx={{ py: 10 }}>
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
      <Grid
        container
        sx={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <Typography variant="h4" fontWeight={700}>
          Top Courses
        </Typography>
        <Link href={navigation.courses.href}>
          <Button variant="text">
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Explore all courses
            </Typography>
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
          </Button>
        </Link>
      </Grid>  
      </motion.div>
      

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              paddingLeft: 3,
              paddingY: 2,
              height: 450,
            }}
          >
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </Box>
        </Box>
      </motion.div>
    </Container>
    </Box>
  );
}
