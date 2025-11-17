"use client";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Button, Typography } from "@mui/material";
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
    <div className="offset-top-bar h-screen flex justify-center items-center">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <CancelRoundedIcon color="error" className="size-8" />
        <Typography variant="h5" fontWeight="500">
          Something went wrong!
        </Typography>
        <Button variant="contained" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
