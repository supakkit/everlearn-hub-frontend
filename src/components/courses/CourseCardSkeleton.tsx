import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";

export function CourseCardSkeleton() {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          width: 250,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 0,
        }}
      >
        {/* Image Skeleton */}
        <Skeleton variant="rectangular" height={180} />

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            {/* Category chip and price */}
            <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 1 }} />
          </Stack>

          {/* Title */}
          <Skeleton variant="text" width="70%" height={40} sx={{ mb: 1 }} />

          {/* Description lines */}
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="90%" />
        </CardContent>

        <CardActions sx={{ mt: "auto" }}>
          {/* Button skeleton */}
          <Skeleton variant="rounded" height={36} width="100%" />
        </CardActions>
      </Card>
    </Grid>
  );
}
