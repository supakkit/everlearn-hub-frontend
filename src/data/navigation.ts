import { Navigation } from "@/types/common/navigation";

export const navigation = {
  home: { label: 'Home', href: '/' },
  signup: { label: "Sign up", href: "/auth/signup" },
  login: { label: "Login", href: "/auth/login" },
  logout: { label: "Logout", href: "/" },
  profile: { label: "Profile", href: "/profile" },
  dashboard: { label: "Dashboard", href: "/dashboard" },
  learn: { label: "Learn", href: "/learn" },
  courses: { label: "Courses", href: "/courses" },
  checkout: { label: "Checkout", href: "/checkout" },
  checkoutCancel: { label: "Cancel Checkout", href: "/checkout/cancel" },
  checkoutFailed: { label: "Checkout Failed", href: "/checkout/failed" },
  checkoutSuccess: { label: "Checkout Success", href: "/checkout/success" },
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
    navigation.logout,
  ],
};
