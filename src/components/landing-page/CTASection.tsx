import { Box, Button, Typography } from "@mui/material";

export function CTASection() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 10,
        background: (theme) =>
          `linear-gradient(0deg, #222 , ${theme.palette.primary.dark})`,
        color: "white",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={2}>
        Start Your Learning Journey Today
      </Typography>
      <Button variant="contained" color="secondary" size="large">
        Sign Up Free
      </Button>
    </Box>
  );
}
