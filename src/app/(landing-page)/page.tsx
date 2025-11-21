import { Box } from "@mui/material";
import { HeroSection } from "../../components/landing-page/HeroSection";
import { FeaturesSection } from "../../components/landing-page/FeaturesSection";
import { CategoriesSection } from "../../components/landing-page/CategoriesSection";
import { CoursesSection } from "../../components/landing-page/CoursesSection";
import { CTASection } from "../../components/landing-page/CTASection";
import { SectionDivider } from "@/components/landing-page/SectionDivider";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <CoursesSection />
      <SectionDivider />
      <CategoriesSection />
      <SectionDivider />
      <FeaturesSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage;
