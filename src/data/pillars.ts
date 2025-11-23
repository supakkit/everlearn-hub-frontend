import { IconComponentType } from "@/types/common/icon";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";

type Pillars = {
  title: string;
  description: string;
  icon: IconComponentType;
};

export const pillars: Pillars[] = [
  {
    title: "Learn with Purpose",
    description:
      "Every lesson is designed to help you grow intentionally, not passively consume information.",
    icon: LightbulbRoundedIcon,
  },
  {
    title: "Consistency Over Intensity",
    description:
      "Small daily sessions create long-lasting progress without stress or overwhelm.",
    icon: AccessTimeRoundedIcon,
  },
  {
    title: "Empower Your Curiosity",
    description:
      "Explore topics that spark joy and keep you motivated throughout your journey.",
    icon: FavoriteRoundedIcon,
  },
  {
    title: "Turn Knowledge Into Action",
    description:
      "Practical micro-skills that you can use immediately in your real life.",
    icon: EmojiObjectsRoundedIcon,
  },
];
