import { CategoryNamesResponse } from "@/types/api/api-types";
import { CategoryName } from "@/types/course";
import * as MuiIcons from "@mui/icons-material";
import { navigation } from "../data/navigation";

const Icons = MuiIcons as Record<string, React.ComponentType>;
type IconName = keyof typeof MuiIcons;

const DynamicIcon = (name: IconName) => {
  if (!(name in Icons)) return null;
  const IconComponent = Icons[name];
  return IconComponent;
};

const categoryAll: CategoryNamesResponse[number] = {
  name: "All",
  slug: "all",
  icon: "EmergencyRounded",
} 

export const mapCategoryNames = (
  categoryNamesData: CategoryNamesResponse
): CategoryName[] => {
  const categoryNames = [categoryAll, ...categoryNamesData];
  return categoryNames.map((categoryName) => ({
    name: categoryName.name,
    slug: categoryName.slug,
    icon:
      DynamicIcon(categoryName.icon as IconName) ||
      MuiIcons["LibraryBooksRounded"],
    href: `${navigation.courses.href}?category=${categoryName.slug}`,
  }));
};
