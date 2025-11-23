"use client";

import { Box } from "@mui/material";
import { motion } from "motion/react";

export function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1],
      }}
      style={{ transformOrigin: "center" }}
    >
      <Box
        sx={{
          height: 6,
          borderRadius: 3,
          mx: "auto",
          width: { xs: "60%", sm: "50%", md: "40%" },
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          my: 6,
        }}
      />
    </motion.div>
  );
}
