import { Alert } from "@mui/material";

export function CourseNotFound() {
  return (
    <Alert
      severity="error"
      color="error"
      sx={{ width: 200, fontWeight: 500, mt: 2, mx: "auto" }}
    >
      Course not found
    </Alert>
  );
}
