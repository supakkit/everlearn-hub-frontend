"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { GoogleIcon } from "@/components/common/CustomIcons";
import { Alert, AlertTitle, Card, Container } from "@mui/material";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { authAPI } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/ToastProvider";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const router = useRouter();
  const { showToast } = useToast();

  const validateInputs = (): boolean => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordErrorMessage("");
    }

    if (!name || name.length < 1) {
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormErrorMessage("");

    if (!validateInputs()) return;

    try {
      await authAPI.signup({ name, email, password });
      showToast("Signed up successfully. Please login.", "success");
      router.push(navigation.login.href);
    } catch (err) {
      console.error(err);
      setFormErrorMessage("Failed to sign up, please try again.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Card
        variant="outlined"
        sx={{ width: "100%", padding: 4, display: "grid", gap: 2 }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
          }}
        >
          Sign up
        </Typography>

        {formErrorMessage && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {formErrorMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              name="name"
              required
              fullWidth
              placeholder="Jon Snow"
              autoComplete="name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameErrorMessage}
              helperText={nameErrorMessage}
            />
          </FormControl>
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
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailErrorMessage}
              helperText={emailErrorMessage}
            />
          </FormControl>
          <Stack>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordErrorMessage}
                helperText={passwordErrorMessage}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlinedDarkMode"
            disabled
            onClick={() => {}}
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              href={navigation.login.href}
              className="underline underline-offset-2"
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
