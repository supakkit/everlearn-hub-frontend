import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { IconComponentType } from "@/types/common/icon";

interface CustomerBenefits {
  content: string;
  icon: IconComponentType;
}

export const customerBenefits: CustomerBenefits[] = [
  { content: "Full access to all lessons", icon: ArticleRoundedIcon },
  { content: "Exclusive members-only content", icon: HttpsRoundedIcon },
  { content: "Lifetime access & future updates", icon: AccessTimeFilledRoundedIcon },
  { content: "Get structured, printable PDFs", icon: PictureAsPdfRoundedIcon },
];
