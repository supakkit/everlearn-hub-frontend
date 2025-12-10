import { Box, Container, Skeleton } from "@mui/material";

export function CourseLearningSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Skeleton variant="text" width={300} height={40} />
      <Skeleton variant="rectangular" height={12} sx={{ my: 2 }} />

      <Box display="flex" gap={4} flexDirection={{ xs: "column", md: "row" }}>
        <Box sx={{ width: { xs: "100%", md: "300px" } }}>
          <Skeleton variant="text" height={30} width={120} />
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={50}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>

        <Box flexGrow={1}>
          <Skeleton variant="rectangular" height={300} />
        </Box>
      </Box>
    </Container>
  );
}
