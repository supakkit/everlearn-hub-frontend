import { navigation } from "./navigation";
import { IconComponentType } from "@/types/common/icon";
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import EmergencyIcon from '@mui/icons-material/Emergency';
import { getSlug } from "@/config/slugify";

interface CourseCategoriesDefinition {
  title: string;
  icon: IconComponentType;
}

interface CourseCategories extends CourseCategoriesDefinition {
  slug: string;
  href: string;
}

function createCategory({
  title,
  icon,
}: CourseCategoriesDefinition): CourseCategories {
  return {
    title,
    icon,

    get slug() {
      return getSlug(title);
    },

    get href() {
      return `${navigation.courses.href}?category=${this.slug}`;
    },
  };
}

const courseCategoriesDefinition: CourseCategoriesDefinition[] = [
  {
    title: "All",
    icon: EmergencyIcon,
  },
  {
    title: "Software Development",
    icon: TerminalRoundedIcon,
  },
  {
    title: "Business",
    icon: CurrencyExchangeRoundedIcon,
  },
  {
    title: "Design",
    icon: BrushRoundedIcon,
  },
  {
    title: "Language",
    icon: TranslateRoundedIcon,
  },
  {
    title: "Productivity",
    icon: RocketLaunchRoundedIcon,
  },
  {
    title: "Wellness",
    icon: SelfImprovementRoundedIcon,
  },
];

export const courseCategories: CourseCategories[] =
  courseCategoriesDefinition.map((item) =>
    createCategory({ title: item.title, icon: item.icon })
  );
