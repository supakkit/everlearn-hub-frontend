"use client";

import { CentralScreenContainer } from "@/components/common/CentralScreenContainer";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <CentralScreenContainer>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: -10 }}>
        <CancelRoundedIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
          Something went wrong!
        </Typography>

        <Button variant="contained" size="large" sx={{ mt: 4 }} onClick={() => reset()}>
          Try again
        </Button>
      </Container>
    </CentralScreenContainer>
  );
}
