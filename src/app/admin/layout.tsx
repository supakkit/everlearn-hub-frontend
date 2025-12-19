import { AdminOnly } from "@/components/common/AdminOnly";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminOnly>{children}</AdminOnly>;
}
