"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  Alert,
  AlertTitle,
  Card,
  Container,
} from "@mui/material";
import Link from "next/link";
import { GoogleIcon } from "@/components/common/CustomIcons";
import { navigation } from "@/data/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const validate = () => {
    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");

    if (!validate()) return;

    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      setFormError("Failed to login, please try again.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Card variant="outlined" sx={{ width: "100%", p: 4, display: "grid", gap: 2 }}>
        
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
          }}
        >
          Sign in
        </Typography>

        {formError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {formError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
          </FormControl>

          <Stack>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                fullWidth
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
              }
              label="Show password"
            />
          </Stack>

          <Button type="submit" fullWidth size="large" variant="contained">
            Sign in
          </Button>
        </Box>

        <Divider>or</Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlinedDarkMode"
            startIcon={<GoogleIcon />}
            onClick={() => {}}
          >
            Sign in with Google
          </Button>

          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link href={navigation.signup.href} className="underline underline-offset-2">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
