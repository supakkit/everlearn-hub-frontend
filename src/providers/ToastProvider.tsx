"use client";

import { createContext, useContext, useState } from "react";
import { Snackbar, Alert, AlertProps } from "@mui/material";

interface ToastContextType {
  showToast: (message: string, severity?: AlertProps["severity"]) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastType {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastType>({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast: ToastContextType["showToast"] = (
    message: string,
    severity = "info"
  ) => {
    setToast({ open: true, message, severity });
  };

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert variant="filled" severity={toast.severity} onClose={handleClose}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}
