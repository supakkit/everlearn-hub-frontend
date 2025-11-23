"use client";

import { Stats } from "@/types/user";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

type PropType = {
  userStats: Stats;
};

export function DashBoardStats({ userStats }: PropType) {
  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Courses Enrolled", value: userStats.enrolled },
          { label: "Lessons Completed", value: userStats.completedLessons },
          { label: "Active Days", value: userStats.activeDays },
        ].map((s, i) => (
          <Grid size={{ xs: 12, sm: 4 }} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {s.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {s.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
