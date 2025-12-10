"use client";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Divider,
  Container,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/providers/ToastProvider";
import { userAPI } from "@/services/users";
import { UpdateProfileDto } from "@/types/api/api-types";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";

type EditUserFormType = UpdateProfileDto & { avatarFile?: File };
type KeyOfEditUserFormType = keyof EditUserFormType;

type FormErrorMessageType = {
  nameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
};

const defaultFormErrorMessage: FormErrorMessageType = {
  nameErrorMessage: "",
  emailErrorMessage: "",
  passwordErrorMessage: "",
};

export default function ProfilePage() {
  const { user, setUser, userLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const defaultUserForm: EditUserFormType = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    deleteAvatar: false,
  };
  const [editUserForm, setEditUserForm] =
    useState<EditUserFormType>(defaultUserForm);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || "");
  const [confirmDeleteAccountInput, setConfirmDeleteAccountInput] =
    useState("");
  const [formErrorMessage, setFormErrorMessage] =
    useState<FormErrorMessageType>(defaultFormErrorMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user || userLoading) return null;

  const validateInputs = (): boolean => {
    let isValid = true;

    if (!editUserForm.email || !/\S+@\S+\.\S+/.test(editUserForm.email)) {
      setFormErrorMessage((prev) => ({
        ...prev,
        emailErrorMessage: "Please enter a valid email address.",
      }));
      isValid = false;
    } else {
      setFormErrorMessage((prev) => ({ ...prev, emailErrorMessage: "" }));
    }

    if (editUserForm.password && editUserForm.password.length < 6) {
      setFormErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: "Password must be at least 6 characters long.",
      }));
      isValid = false;
    } else {
      setFormErrorMessage((prev) => ({ ...prev, passwordErrorMessage: "" }));
    }

    if (!editUserForm.name || editUserForm.name.length < 1) {
      setFormErrorMessage((prev) => ({
        ...prev,
        nameErrorMessage: "Name is required.",
      }));
      isValid = false;
    } else {
      setFormErrorMessage((prev) => ({ ...prev, nameErrorMessage: "" }));
    }

    return isValid;
  };

  // --- Handlers ---
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const previewURL = URL.createObjectURL(file);
      setEditUserForm((prev) => ({ ...prev, avatarFile: file }));
      setAvatarPreview(previewURL);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormErrorMessage(defaultFormErrorMessage);

    if (!validateInputs()) return;

    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(editUserForm).forEach((key) => {
        const value = editUserForm[key as KeyOfEditUserFormType];
        if ((key === "name" || key === "email") && value === user[key]) {
        } else if (value) {
          const transformValue = value instanceof Blob ? value : String(value);
          formData.append(key, transformValue);
        }
      });

      const updatedUser = await userAPI.updateProfile(formData);
      setUser(updatedUser);

      showToast("Profile updated successfully.", "success");
      setEditMode(false);
      setConfirmDeleteAccountInput("");
      setEditUserForm({
        ...defaultUserForm,
        name: updatedUser.name,
        email: updatedUser.email,
      });
      setAvatarPreview(updatedUser.avatarUrl || "");
      setFormErrorMessage(defaultFormErrorMessage);
    } catch (err) {
      console.error(err);
      showToast("Failed to update profile.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmDeleteAccountInput !== user.email) return;

    try {
      setLoading(true);
      await userAPI.deleteAccount();
      showToast("Account deleted successfully.", "success");
      setUser(null);
      router.replace(navigation.signup.href);
    } catch (err) {
      console.error(err);
      showToast("Failed to delete account.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);

    setConfirmDeleteAccountInput("");
    setEditUserForm(defaultUserForm);
    setFormErrorMessage(defaultFormErrorMessage);
  };

  return (
    <Container sx={{ py: 6 }}>
      {/* Page title */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Profile Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Manage your personal information and account preferences.
        </Typography>
      </motion.div>

      <Grid container direction="column" spacing={4}>
        {/* Personal Info Section */}
        <Grid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent>
                <Grid
                  container
                  columns={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Personal Information
                  </Typography>

                  <Button
                    variant="outlinedDarkMode"
                    onClick={handleEditMode}
                    disabled={loading}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </Button>
                </Grid>

                {/* Avatar */}
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar
                    src={!editUserForm.deleteAvatar ? avatarPreview : ""}
                    sx={{ width: 72, height: 72, border: "2px solid #ccc" }}
                  />
                  {editMode && (
                    <Stack direction="row" gap={1}>
                      <Button variant="outlinedDarkMode" component="label">
                        Upload Avatar
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          disabled={loading}
                          onChange={handleAvatarUpload}
                        />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        component="label"
                        disabled={loading}
                        onClick={() =>
                          setEditUserForm((prev) => ({
                            ...prev,
                            deleteAvatar: !editUserForm.deleteAvatar,
                          }))
                        }
                      >
                        {editUserForm.deleteAvatar
                          ? "Cancel Remove Avatar"
                          : "Remove Avatar"}
                      </Button>
                    </Stack>
                  )}
                </Box>

                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={editUserForm.name}
                  disabled={!editMode || loading}
                  onChange={handleFormChange}
                  error={!!formErrorMessage.nameErrorMessage}
                  helperText={formErrorMessage.nameErrorMessage}
                  sx={{ mb: 2 }}
                  slotProps={{ inputLabel: { color: "white" } }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={editUserForm.email}
                  disabled={!editMode || loading}
                  onChange={handleFormChange}
                  error={!!formErrorMessage.emailErrorMessage}
                  helperText={formErrorMessage.emailErrorMessage}
                  sx={{ mb: 2 }}
                  slotProps={{ inputLabel: { color: "white" } }}
                />

                {editMode && (
                  <Stack sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={editUserForm.password}
                      disabled={loading}
                      onChange={handleFormChange}
                      error={!!formErrorMessage.passwordErrorMessage}
                      helperText={formErrorMessage.passwordErrorMessage}
                      slotProps={{ inputLabel: { color: "white" } }}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showPassword}
                          disabled={loading}
                          onChange={() => setShowPassword((prev) => !prev)}
                        />
                      }
                      label="Show password"
                    />
                  </Stack>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ display: editMode ? "block" : "none" }}
                  disabled={loading}
                  onClick={handleSaveProfile}
                >
                  {loading ? "Saving Changes..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Danger Zone */}
        <Grid sx={{ display: editMode ? "block" : "none" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card sx={{ border: "1px solid #f44336" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="error" mb={1}>
                  Danger Zone
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                  To delete your account permanently, type your email{" "}
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    {user.email}
                  </Box>{" "}
                  below to confirm.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Type your email to confirm"
                  value={confirmDeleteAccountInput}
                  disabled={loading}
                  onChange={(e) => setConfirmDeleteAccountInput(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  disabled={confirmDeleteAccountInput !== user.email || loading}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
