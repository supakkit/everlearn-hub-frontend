import { IconComponentType } from "@/types/common/icon";
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded';
import HouseboatRoundedIcon from '@mui/icons-material/HouseboatRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';

interface AppFeatures {
  title: string;
  content: string;
  icon: IconComponentType;
}

export const appFeatures: AppFeatures[] = [
  {
    title: "Micro-Lessons",
    content:
      "Bite-sized lessons designed for fast learning and easy daily progress.",
      icon: LibraryBooksRoundedIcon,
  },
  {
    title: "Expert Instructors",
    content:
      "Learn from experienced educators and industry professionals who teach real-world skills.",
      icon: Diversity2RoundedIcon,
  },
  {
    title: "Learn from Anywhere",
    content:
      "Access all courses on any device, anytime—your learning fits your lifestyle.",
      icon: HouseboatRoundedIcon,
  },
  {
    title: "Downloadable PDFs",
    content:
      "Get structured, printable PDFs to reinforce lessons and study offline.",
      icon: PictureAsPdfRoundedIcon,
  },
];
