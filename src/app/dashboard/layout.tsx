import { Protected } from "@/components/common/Protected";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Protected>{children}</Protected>;
}
