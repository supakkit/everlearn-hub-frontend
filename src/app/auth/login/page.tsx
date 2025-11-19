

export default function LoginPage({ searchParams }: { searchParams: { redirect: string } }) {
  const redirectTo = searchParams.redirect || "/";

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      {/* <LoginForm redirectTo={redirectTo} /> */}
    </div>
  );
}
