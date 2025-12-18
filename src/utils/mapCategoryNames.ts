import { CategoryResponse } from "@/types/api/api-types";
import * as MuiIcons from "@mui/icons-material";
import { navigation } from "../data/navigation";
import { IconComponentType } from "@/types/common/icon";

export interface CategoryName {
  name: string;
  slug: string;
  icon: IconComponentType;
  href: string;
}

const Icons = MuiIcons as Record<string, React.ComponentType>;
type IconName = keyof typeof MuiIcons;

const dynamicIcon = (name: IconName) => {
  if (!(name in Icons)) return null;
  const IconComponent = Icons[name];
  return IconComponent;
};

const categoryAll: Omit<CategoryResponse, "id"> = {
  name: "All",
  slug: "all",
  icon: "EmergencyRounded",
};

export const mapCategoryNames = (
  categoryNamesData: CategoryResponse[]
): CategoryName[] => {
  const categoryNames = [categoryAll, ...categoryNamesData];
  return categoryNames.map((categoryName) => ({
    name: categoryName.name,
    slug: categoryName.slug,
    icon:
      dynamicIcon(categoryName.icon as IconName) ||
      MuiIcons["LibraryBooksRounded"],
    href: `${navigation.courses.href}?category=${categoryName.slug}`,
  }));
};
