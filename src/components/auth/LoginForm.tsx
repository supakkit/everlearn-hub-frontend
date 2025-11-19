"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import type { LoginPageProps, LoginFormData, LoginFunction } from "./types";

const mockLogin: LoginFunction = async (email, password) => {
  if (email === "test@example.com" && password === "123456") {
    return {
      success: true,
      user: { id: "1", email, name: "Test User" },
    };
  }
  return { success: false, message: "Invalid credentials" };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const router = useRouter();
  const redirectTo = searchParams?.redirect || "/";

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (field: keyof LoginFormData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = async () => {
    setError("");

    const response = await mockLogin(form.email, form.password);

    if (!response.success) {
      setError(response.message || "Login failed");
      return;
    }

    router.push(redirectTo);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      height="100vh"
      px={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange("email")}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange("password")}
        />

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
