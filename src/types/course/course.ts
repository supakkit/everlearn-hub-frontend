import { Lesson } from "./lesson";

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  lessons: Lesson[];
}