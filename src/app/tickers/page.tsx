import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import { TickersTableControls } from './TickersTableControls';

export default function Page() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">
        Tickers list
      </Typography>
      <Suspense>
        <TickersTableControls />
      </Suspense>
    </Stack>
  );
}
