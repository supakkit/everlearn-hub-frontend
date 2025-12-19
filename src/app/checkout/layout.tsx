import { Protected } from "@/components/common/Protected";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Protected>{children}</Protected>;
}
