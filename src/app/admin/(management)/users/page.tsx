"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  Alert,
  Avatar,


  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { FullDetailUserResponse, UserRole } from "@/types/api/api-types";
import { CourseOverviewSkeleton } from "@/components/admin/courses/CourseOverviewSkeleton";
import { useToast } from "@/providers/ToastProvider";
import { userAPI } from "@/services/users";

export default function UserManagementPage() {
  const [users, setUsers] = useState<FullDetailUserResponse[]>([]);
  const [totalItems, setTotalItems] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [editMode, setEditMode] = useState(false);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);

  const { showToast } = useToast();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fetchUsers = useCallback(
    async (page: number = 1, rowsPerPage: number = 5) => {
      setLoading(true);
      setError("");
      try {
        const { users, total } = await userAPI.getFullDetailUsers({
          page: String(page),
          limit: String(rowsPerPage),
        });
        setUsers(users);
        setTotalItems(total);
      } catch (err) {
        setError("Failed to fetch users");
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleChangeRole = async (userId: string, role: UserRole) => {
    const confirm = window.confirm(
      `Are you sure to change the role for this user to ${role}?`
    );
    if (!confirm) return;
    setUpdateUserLoading(true);
    try {
      const updatedUser = await userAPI.adminUpdateUser(userId, { role });
      setUsers((users) =>
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      showToast("Updated user successfully", "success");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      showToast("Failed to update user", "error");
    } finally {
      setUpdateUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage, fetchUsers]);

  if (loading) return <CourseOverviewSkeleton />;
  if (error)
    return (
      <Alert
        severity="error"
        color="error"
        sx={{ width: "fit-content", px: 3, fontWeight: 500, mt: 2, mx: "auto" }}
      >
        {error}
      </Alert>
    );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Users
        </Typography>
        <Button
          variant={editMode ? "outlinedDarkMode" : "contained"}
          onClick={() => setEditMode(prev => !prev)}
          sx={{ minWidth: 100 }}
        >
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </Box>

      {/* User Table */}
      <TableContainer
        sx={{
          minHeight: 300,
          maxHeight: "60vh",
          overflowX: "auto",
          bgcolor: "background.paper",
        }}
      >
        <Table
          aria-label="Course management table"
          size="small"
          stickyHeader
          sx={{ minWidth: 900 }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Account Status</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ opacity: loading ? 0.5 : 1 }}>
            {users.map((user, index) => (
              <TableRow key={user.id} hover>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar src={user.avatarUrl} alt={user.name} />
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  {user.isDeleted ? (
                    <Chip label="Deleted" size="small" />
                  ) : (
                    <Chip label="Active" color="success" size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <FormControl fullWidth>
                    <Select
                      labelId="change-user-rol-label"
                      id="change-user-role"
                      value={user.role}
                      size="small"
                      disabled={!editMode || updateUserLoading}
                      onChange={(e) =>
                        handleChangeRole(user.id, e.target.value as UserRole)
                      }
                    >
                      {Object.keys(UserRole).map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 0 }}>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
