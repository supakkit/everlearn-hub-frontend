export function CentralScreenContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="offset-top-bar min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
