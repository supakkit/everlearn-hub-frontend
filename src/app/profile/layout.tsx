import { Protected } from "@/components/common/Protected";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Protected>{children}</Protected>;
}
