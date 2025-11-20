import { Navigation } from "@/types/common/navigation";

export const navigation = {
  home: { label: 'Home', href: '/' },
  signup: { label: "Sign up", href: "/auth/signup" },
  login: { label: "Login", href: "/auth/login" },
  logout: { label: "Logout", href: "/" },
  profile: { label: "Profile", href: "/profile" },
  dashboard: { label: "Dashboard", href: "/dashboard" },
  library: { label: "Library", href: "/learn" },
  courses: { label: "Courses", href: "/courses" },
};

interface NavbarItems {
  pages: Navigation[];
  settings: Navigation[];
}

export const navbarItems: NavbarItems = {
  pages: [navigation.courses],
  settings: [
    navigation.profile,
    navigation.dashboard,
    navigation.library,
    navigation.logout,
  ],
};
