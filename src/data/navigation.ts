import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';

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
  admin: { label: "Admin Dashboard", href: "/admin" },
};

export const adminMenuItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/admin",
  },
  {
    label: "Users",
    title: "User Management",
    icon: PeopleIcon,
    href: "/admin/users",
  },
  {
    label: "Courses",
    title: "Course Management",
    icon: BookIcon,
    href: "/admin/courses",
  },
  {
    label: "Enrollment",
    title: "Enrollment Management",
    icon: ViewListRoundedIcon,
    href: "/admin/enrollments",
  },
  {
    label: "Categories",
    title: "Category Management",
    icon: CategoryIcon,
    href: "/admin/categories",
  },
  {
    label: "Payments",
    title: "Payment Management",
    icon: PaymentIcon,
    href: "/admin/payments",
  },
  {
    label: "Stripe Events",
    title: "Stripe Events",
    icon: ReceiptIcon,
    href: "/admin/stripe-events",
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
};
