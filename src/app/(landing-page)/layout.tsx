import { TopAppBar } from "@/components/navigation/TopAppBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <TopAppBar />
      {children}
    </main>
  );
}
