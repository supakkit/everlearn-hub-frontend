import { Button, Typography } from "@mui/material";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="offset-top-bar h-screen flex justify-center items-center">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <CancelPresentationRoundedIcon className="size-8" color="warning" />
        <Typography variant="h5" fontWeight="500">
          404 Not Found
        </Typography>
        <Typography variant="h5" fontWeight="500">
          Could not find the page.
        </Typography>
        <Link href="/">
          <Button variant="contained">Go Back</Button>
        </Link>
      </div>
    </div>
  );
}
