import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Greeting */}
      <Box mb={3}>
        <Skeleton variant="text" width={260} height={38} />
        <Skeleton variant="text" width={320} height={20} />
      </Box>

      {/* Stats Section */}
      <Box>
        <Grid container spacing={3} mb={4}>
          {[1, 2, 3].map((_, i) => (
            <Grid size={{ xs: 12, sm: 4 }} key={i}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={80} height={34} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tabs */}
      <Box sx={{ width: "100%" }} mb={3}>
        <Stack direction='row' gap={2}>
        <Skeleton variant="text" height={60} sx={{ width: { xs: '100%', sm: 200 } }} />
        <Skeleton variant="text" height={60} sx={{ width: { xs: '100%', sm: 200 } }} />
        </Stack>
      </Box>

      {/* Courses List */}
      <Grid container spacing={3}>
        {[1, 2].map((_, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                {/* Title + lessons count */}
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Skeleton variant="text" width={180} height={28} />
                  <Skeleton variant="text" width={50} height={28} />
                </Stack>

                <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />

                {/* Progress bar */}
                <Skeleton variant="rectangular" width="100%" height={10} sx={{ mb: 2 }} />

                {/* Button */}
                <Skeleton variant="rectangular" width="100%" height={40} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
