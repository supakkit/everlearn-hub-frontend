import { Card, CardContent, Grid, Skeleton, Box } from "@mui/material";

export function CourseFormSkeleton() {
  return (
    <Card sx={{ borderRadius: 2, p: 1 }}>
      <CardContent>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid size={{ xs: 12 }}>
            <Skeleton variant="rounded" height={56} />
          </Grid>

          {/* Category */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={56} />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <Skeleton variant="rounded" height={96} />
          </Grid>

          {/* Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton width={120} height={32} sx={{ mb: 1 }} />

            <Box display="flex" alignItems="center" gap={2}>
              <Skeleton variant="rounded" width={96} height={96} />
              <Skeleton variant="rounded" width={140} height={40} />
            </Box>
          </Grid>

          {/* Price + switches */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />

            <Box display="flex" gap={4}>
              <Skeleton width={120} height={42} />
              <Skeleton width={120} height={42} />
            </Box>
          </Grid>

          {/* Submit */}
          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <Skeleton variant="rounded" width={180} height={40} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
