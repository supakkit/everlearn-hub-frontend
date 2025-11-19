import { Typography, Button, Container, Grid } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Link from "next/link";
import { CentralScreenContainer } from "@/components/common/CentralScreenContainer";

export default function CheckoutFailedPage() {
  return (
    <CentralScreenContainer>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: -10 }}>
        <ReportGmailerrorredIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
          Payment Failed
        </Typography>
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Something went wrong with your payment. Your card may have been
          declined or the payment gateway had an issue.
        </Typography>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 4,
          }}
        >
          <Link href="/checkout">
            <Button variant="contained" color="primary" size="large">
              Try Again
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outlinedDarkMode" size="large">
              Back to Home
            </Button>
          </Link>
        </Grid>
      </Container>
    </CentralScreenContainer>
  );
}
