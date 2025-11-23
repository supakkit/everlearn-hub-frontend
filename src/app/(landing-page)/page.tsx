import { Box } from "@mui/material";
import { HeroSection } from "../../components/landing-page/HeroSection";
import { FeaturesSection } from "../../components/landing-page/FeaturesSection";
import { CategoriesSection } from "../../components/landing-page/CategoriesSection";
import { CoursesSection } from "../../components/landing-page/CoursesSection";
import { CTASection } from "../../components/landing-page/CTASection";
import { SectionDivider } from "@/components/landing-page/SectionDivider";
import { TestimonialsSection } from "@/components/landing-page/TestimonialsSection";
import { FAQSection } from "@/components/landing-page/FAQSection";
import { PillarsSection } from "@/components/landing-page/PillarsSection";

export default function LandingPage() {
  return (
    <Box>
      <HeroSection />
      <CoursesSection />
      <SectionDivider />
      <CategoriesSection />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <PillarsSection />
      <SectionDivider />
      <FAQSection />
      <CTASection />
    </Box>
  );
}
