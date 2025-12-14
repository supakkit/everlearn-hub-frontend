import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function CourseOverviewSkeleton() {
  const rows = Array.from({ length: 5 });

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Skeleton variant="text" width={160} height={40} />
        <Skeleton variant="rounded" width={160} height={40} />
      </Box>

      {/* Table */}
      <TableContainer
        sx={{
          minHeight: 300,
          maxHeight: "60vh",
          overflowX: "auto",
          bgcolor: "background.paper",
        }}
      >
        <Table size="small" stickyHeader sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Lessons</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="rounded" width={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width="70%" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width="50%" />
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Skeleton variant="rounded" width={40} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Skeleton variant="rounded" width={30} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Skeleton variant="rounded" width={70} height={24} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Skeleton variant="circular" width={32} height={32} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ p: 1, justifySelf: "end" }}>
        <Skeleton height={40} width={200} />
      </Box>
    </>
  );
}
