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
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  // Mock user data — replace with your real backend later
  const user = {
    name: "John Doe",
    email: "john@gmail.com",
    avatar: "",
  };

  const [editMode, setEditMode] = useState(false);
  const [editUserForm, setEditUserForm] = useState(user);
  const [deleteEmailInput, setDeleteEmailInput] = useState("");
  const [error, setError] = useState("");

  // --- Handlers ---
  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setEditUserForm((prev) => ({ ...prev, avatar: url }));
    }
  }

  function handleEditUser(e: React.ChangeEvent<HTMLInputElement>) {
    setEditUserForm((prev) => ({ ...prev, name: e.target.value }))
  }
  
  function handleSaveProfile() {
    console.log("Saving profile...", editUserForm);
  }

  function handleDeleteAccount() {
    if (deleteEmailInput !== user.email) {
      alert("Email does not match. Please type your correct email to confirm.");
      return;
    }

    console.log("Account deleted.");
  }

  function handleEditMode() {
    setEditMode(prev => !prev);
    setEditUserForm(user);
    setDeleteEmailInput('');
  }

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

      <Grid container direction='column' spacing={4}>
        {/* Personal Info Section */}
        <Grid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card >
              <CardContent>
                <Grid container columns={2} sx={{ justifyContent: 'space-between' }} >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Personal Information
                </Typography>

                 <Button
                  variant="outlinedDarkMode"
                  onClick={handleEditMode}
                >
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
                </Grid>

                {/* Avatar */}
                <Box display="flex" alignItems="center" gap={2} mb={3} >
                  <Avatar
                    src={user.avatar}
                    sx={{ width: 72, height: 72, border: "2px solid #ccc" }}
                  />
                  <Button variant="outlinedDarkMode" component="label" disabled={!editMode}>
                    Upload Avatar
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </Button>
                </Box>

                <TextField
                  fullWidth
                  label="Full Name"
                  value={editUserForm.name}
                  disabled={!editMode}
                  onChange={handleEditUser}
                  sx={{ mb: 2 }}
                  slotProps={{ inputLabel: { color: 'white' } }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  value={user.email}
                  disabled
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ display: editMode ? 'block' : 'none' }}
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Danger Zone */}
        <Grid sx={{ display: editMode ? 'block' : 'none' }} >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card sx={{ border: "1px solid #f44336" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="error"
                  mb={1}
                >
                  Danger Zone
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                  To delete your account permanently, please type your email
                  address below to confirm.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Type your email to confirm"
                  value={deleteEmailInput}
                  onChange={(e) => setDeleteEmailInput(e.target.value)}
                  sx={{ mb: 2 }}
                  slotProps={{ inputLabel: { color: 'white' } }}
                />

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  disabled={deleteEmailInput !== user.email}
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
