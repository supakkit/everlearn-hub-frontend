import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { DashBoardStats } from "@/components/dashboard/DashBoardStats";
import DashboardTabs from "@/components/dashboard/DashBoardTab";
import { DashBoardWelcome } from "@/components/dashboard/DashBoardWelcome";
import { userData } from "@/data/user";
import { enrolledCourse } from "@/types/user";
import { Container } from "@mui/material";

export default function DashboardPage() {
  // const [learningCourses, completedCourses] = await Promise.all([
  //   getLearningCourses(),    // server DB fetch
  //   getCompletedCourses(),   // server DB fetch
  // ]);

  // Mock data — replace with backend data later
  const user = userData;
  
  const learningCourses: enrolledCourse[] = [];
  const completedCourses: enrolledCourse[] = [];
  user.enrolledCourses.forEach((course) => {
    if (course.progress < 100) learningCourses.push(course);
    else completedCourses.push(course);
  });

  return (
    <Container sx={{ py: 6 }}>
      <DashBoardWelcome user={user} />
      <DashBoardStats userStats={user.stats} />
      <DashboardTabs learning={learningCourses} completed={completedCourses} />
      <DashboardFooter />
    </Container>
  );
}
