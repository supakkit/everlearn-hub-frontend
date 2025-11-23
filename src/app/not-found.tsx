import { Button, Container, Typography } from "@mui/material";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import Link from "next/link";
import { CentralScreenContainer } from "@/components/common/CentralScreenContainer";
import { navigation } from "@/data/navigation";

export default function NotFound() {
  return (
    <CentralScreenContainer>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: -10 }}>
        <CancelPresentationRoundedIcon color="warning" sx={{ fontSize: 80 }} />

        <Typography
          variant="h4"
          sx={{ mt: 2, lineHeight: 1.5, fontWeight: "bold" }}
        >
          404 Not Found
          <br />
          Could not find the page.
        </Typography>

        <Link href={navigation.home.href}>
          <Button variant="contained" size="large" sx={{ mt: 4 }}>
            Back to Home
          </Button>
        </Link>
      </Container>
    </CentralScreenContainer>
  );
}
