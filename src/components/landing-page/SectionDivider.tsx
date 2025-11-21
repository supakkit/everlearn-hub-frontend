"use client";

import { Box } from "@mui/material";
import { motion } from "motion/react";

export const SectionDivider: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1],
        }}
    >
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.secondary.main
              : theme.palette.primary.main,
          height: 6,
          width: '50%',
          borderRadius: 3,
          marginX: "auto",
          marginY: 5,
        }}
      />  
    </motion.div>
    
  );
};
