export interface Course {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  preview: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    slug: "react-for-beginners",
    category: "Web Development",
    image: "https://picsum.photos/400/260",
    description: "Learn React from scratch and build dynamic web applications.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
  {
    id: 2,
    title: "UI/UX Complete Bootcamp",
    slug: "ui-ux-complete-bootcamp",
    category: "Design",
    image: "https://picsum.photos/401/260",
    description: "Master the fundamentals of UI/UX with hands-on projects.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
  {
    id: 3,
    title: "Business Strategy 101",
    slug: "business-strategy-101",
    category: "Business",
    image: "https://picsum.photos/402/260",
    description: "Build essential business strategy skills.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
  {
    id: 4,
    title: "Intro to Python",
    slug: "intro-to-python",
    category: "Web Development",
    image: "https://picsum.photos/403/260",
    description: "Get started with Python programming.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
  {
    id: 5,
    title: "React for Beginners 2",
    slug: "react-for-beginners-2",
    category: "Web Development",
    image: "https://picsum.photos/404/260",
    description: "Learn React from scratch and build dynamic web applications.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
  {
    id: 6,
    title: "UI/UX Complete Bootcamp 2",
    slug: "ui-ux-complete-bootcamp-2",
    category: "Design",
    image: "https://picsum.photos/405/260",
    description: "Master the fundamentals of UI/UX with hands-on projects.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
  {
    id: 7,
    title: "Business Strategy 101 2",
    slug: "business-strategy-101-2",
    category: "Business",
    image: "https://picsum.photos/406/260",
    description: "Build essential business strategy skills.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
  {
    id: 8,
    title: "Intro to Python 2",
    slug: "intro-to-python-2",
    category: "Web Development",
    image: "https://picsum.photos/407/260",
    description: "Get started with Python programming.",
    lessons: [
      { id: 1, title: "Welcome to the Course", preview: true },
      { id: 2, title: "What is JavaScript?", preview: true },
      { id: 3, title: "Variables Explained", preview: false },
      { id: 4, title: "Basic Math Operations", preview: false },
    ],
  },
];