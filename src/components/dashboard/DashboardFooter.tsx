import { navigation } from "@/data/navigation";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <Box mt={5} display="flex" gap={2}>
      <Link href={navigation.courses.href}>
        <Button variant="outlinedDarkMode">Explore Courses</Button>
      </Link>

      <Link href={navigation.profile.href}>
        <Button variant="outlinedDarkMode">Profile Settings</Button>
      </Link>
    </Box>
  );
}
