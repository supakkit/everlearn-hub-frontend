import { Box } from "@mui/material";
import { HeroSection } from "../../components/landing-page/HeroSection";
import { FeaturesSection } from "../../components/landing-page/FeaturesSection";
import { CategoriesSection } from "../../components/landing-page/CategoriesSection";
import { TrendingCoursesSection } from "../../components/landing-page/TrendingCoursesSection";
import { HowItWorksSection } from "../../components/landing-page/HowItWorksSection";
import { CTASection } from "../../components/landing-page/CTASection";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <TrendingCoursesSection />
      <HowItWorksSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage;
