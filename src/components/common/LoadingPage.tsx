import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export function LoadingPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 2 }}>
      <CircularProgress size={30} />
      <Typography>Loading...</Typography>
    </Box>
  );
}
