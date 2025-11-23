import { IconComponentType } from "@/types/common/icon";
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import SettingsAccessibilityRoundedIcon from '@mui/icons-material/SettingsAccessibilityRounded';

type TrustBadges = {
  title: string;
  description: string;
  icon: IconComponentType;
};

export const trustBadges: TrustBadges[] = [
  {
    title: "Quality You Can Trust",
    icon: WorkspacePremiumRoundedIcon,
    description: "Expert-crafted courses only",
  },
  {
    title: "Secure & Private",
    icon: ShieldRoundedIcon,
    description: "Your progress is always protected",
  },
  { title: "Learn Your Way", 
    icon: SettingsAccessibilityRoundedIcon, 
    description: "Anytime, anywhere access" },
];
