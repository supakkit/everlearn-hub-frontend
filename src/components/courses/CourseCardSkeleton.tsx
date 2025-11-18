import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";

export function CourseCardSkeleton() {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 0,
        }}
      >
        {/* Image Skeleton */}
        <Skeleton variant="rectangular" height={160} />

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Title */}
          <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />

          {/* Category chip */}
          <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 2 }} />

          {/* Description lines */}
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="60%" />
        </CardContent>

        <CardActions sx={{ mt: "auto" }}>
          {/* Button skeleton */}
          <Skeleton variant="rounded" height={36} width="100%" />
        </CardActions>
      </Card>
    </Grid>
  );
}
