import { NonAuthOnly } from "@/components/common/NonAuthOnly";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NonAuthOnly>{children}</NonAuthOnly>;
}
