import { Typography, Button, Container, Grid } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Link from "next/link";
import { CentralScreenContainer } from "@/components/common/CentralScreenContainer";
import { navigation } from "@/data/navigation";

export default function CheckoutCancelPage() {
  return (
    <CentralScreenContainer>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: -10 }}>
        <CancelPresentationIcon color="warning" sx={{ fontSize: 80 }} />

        <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
          Checkout Canceled
        </Typography>

        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          You canceled the checkout process. No charges were made.
        </Typography>

        <Grid
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "center",
            gap: 2,
            marginTop: 4,
          }}
        >
          <Link href={navigation.courses.href}>
            <Button variant="contained" color="primary" size="large">
              Continue Browsing Courses
            </Button>
          </Link>

          <Link href={navigation.home.href}>
            <Button variant="outlinedDarkMode" size="large">
              Back to Home
            </Button>
          </Link>
        </Grid>
      </Container>
    </CentralScreenContainer>
  );
}
