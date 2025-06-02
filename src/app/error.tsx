'use client';
import { Box, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box className="flex items-center justify-center space-x-6">
      <Alert severity="warning">Something went wrong!</Alert>
      <Button onClick={() => reset()} variant="outlined">
        Try again
      </Button>
    </Box>
  );
}
