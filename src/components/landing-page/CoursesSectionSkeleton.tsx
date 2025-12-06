import { Container, Grid, Skeleton, Box } from "@mui/material";
import { CourseCardSkeleton } from "../courses/CourseCardSkeleton";

export function CoursesSectionSkeleton() {
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "baseline" }}
        >
          <Skeleton variant="text" width={180} height={60} />
          <Skeleton variant="text" width={180} height={60} />
        </Grid>

        <Box sx={{ overflowX: "hidden" }}>
          <Box
            sx={{
              display: "inline-flex",
              gap: 3,
              paddingY: 2,
              height: 450,
            }}
          >
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
            <CourseCardSkeleton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
