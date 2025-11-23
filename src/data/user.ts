export const userData = { 
  id: '1',
  fullName: "John Doe",
  email: 'johndoe@email.com',
  password: '',
  avatarUrl: '',
  role: 'user',
  stats: {
    enrolled: 4,
    completedLessons: 32,
    activeDays: 12,
  },
  enrolledCourses: [
    {
      id: "course_1",
      title: "React for Beginners",
      progress: 45,
      lessonProgress: [ 'lesson_1', 'lesson_2', 'lesson_3', ],
    },
    {
      id: "course_2",
      title: "Next.js Mastery",
      progress: 80,
      lessonProgress: [ 'lesson_1', ],
    },
    {
      id: "course_3",
      title: "Next.js Mastery",
      progress: 100,
      lessonProgress: [ 'lesson_1', 'lesson_2', ],
    },
  ],

};



