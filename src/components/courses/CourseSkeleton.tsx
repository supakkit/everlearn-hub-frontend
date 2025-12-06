import { Container, Grid, Skeleton, Chip } from "@mui/material";

export function CourseSkeleton() {
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Thumbnail Skeleton */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Category */}
          <Chip
            sx={{
              mb: 2,
              width: 120,
              height: 32,
            }}
          />

          {/* Title */}
          <Skeleton variant="text" width="80%" height={60} />

          {/* Description */}
          <Skeleton variant="text" width="100%" height={28} />
          <Skeleton variant="text" width="90%" height={28} sx={{ mb: 2 }} />

          {/* Price */}
          <Skeleton variant="text" width={180} height={70} sx={{ mb: 2 }} />

          {/* Button */}
          <Skeleton variant="rectangular" width={180} height={50} sx={{ borderRadius: '25px' }} />
        </Grid>
      </Grid>
    </Container>
  );
}
