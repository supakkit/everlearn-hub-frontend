type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Suda P.",
    role: "Working Mom",
    quote:
      "EverLearn Hub makes it easy to learn something new every day — even with only 10 minutes!",
    avatar: "/avatars/user1.jpg",
  },
  {
    name: "Narin T.",
    role: "University Student",
    quote:
      "The micro-lessons are incredibly practical and well structured. I improved faster than expected.",
    avatar: "/avatars/user2.jpg",
  },
  {
    name: "Ploy S.",
    role: "Designer",
    quote:
      "I love the clean UI and step-by-step lessons. It's perfect for self-learning.",
    avatar: "/avatars/user3.jpg",
  },
];
