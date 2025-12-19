import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentIcon from "@mui/icons-material/Payment";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';

const adminPreview = {
  courses: { label: "Course Preview", href: "/admin/preview/courses" },
}

const adminNavigation = {
  dashboard: { label: "Admin Dashboard", href: "/admin" },
  users: { label: "Users", href: "/admin/users" },
  courses: { label: "Courses", href: "/admin/courses" },
  enrollment: { label: "Enrollment", href: "/admin/enrollments" },
  categories: { label: "Categories", href: "/admin/categories" },
  payments: { label: "Payments", href: "/admin/payments" },
  preview: adminPreview,
}

export const navigation = {
  home: { label: "Home", href: "/" },
  signup: { label: "Sign up", href: "/auth/signup" },
  login: { label: "Login", href: "/auth/login" },
  profile: { label: "Profile", href: "/profile" },
  dashboard: { label: "Dashboard", href: "/dashboard" },
  learn: { label: "Learn", href: "/learn" },
  courses: { label: "Courses", href: "/courses" },
  checkout: { label: "Checkout", href: "/checkout" },
  checkoutCancel: { label: "Cancel Checkout", href: "/checkout/cancel" },
  checkoutFailed: { label: "Checkout Failed", href: "/checkout/failed" },
  checkoutSuccess: { label: "Checkout Success", href: "/checkout/success" },
  admin: adminNavigation,
};

export const adminMenuItems = [
  {
    label: adminNavigation.dashboard.label,
    title: "Dashboard",
    icon: DashboardIcon,
    href: adminNavigation.dashboard.href,
  },
  {
    label: adminNavigation.users.label,
    title: "User Management",
    icon: PeopleIcon,
    href: adminNavigation.users.href,
  },
  {
    label: adminNavigation.courses.label,
    title: "Course Management",
    icon: BookIcon,
    href: adminNavigation.courses.href,
  },
  {
    label: adminNavigation.categories.label,
    title: "Category Management",
    icon: CategoryIcon,
    href: adminNavigation.categories.href,
  },
  {
    label: adminNavigation.enrollment.label,
    title: "Enrollment Management",
    icon: ViewListRoundedIcon,
    href: adminNavigation.enrollment.href,
  },
  {
    label: adminNavigation.payments.label,
    title: "Payment Management",
    icon: PaymentIcon,
    href: adminNavigation.payments.href,
  },
];

const pages = [
  {
    label: navigation.courses.label,
    icon: LocalLibraryRoundedIcon,
    href: navigation.courses.href,
  },
];

export const navbarItems = {
  pages: pages,
  settings: [navigation.profile, navigation.dashboard],
  adminSettings: [navigation.profile, navigation.dashboard, navigation.admin.dashboard],
};
