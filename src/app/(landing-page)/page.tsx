"use client";

import { Box } from "@mui/material";
import { HeroSection } from "../../components/landing-page/HeroSection";
import { FeaturesSection } from "../../components/landing-page/FeaturesSection";
import { CategoriesSection } from "../../components/landing-page/CategoriesSection";
import { TrendingCoursesSection } from "../../components/landing-page/TrendingCoursesSection";
import { HowItWorksSection } from "../../components/landing-page/HowItWorksSection";
import { CTASection } from "../../components/landing-page/CTASection";

export default function LandingPage() {
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
}
