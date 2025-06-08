import { TickersTable } from '@/components/Table/TickersTable';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Stack spacing={2}>
      <Typography component="h1" className="mb-4">
        This is Financial sheets!
      </Typography>
      <Typography variant="h3" component="h3">
        Tickers list
      </Typography>
      <Suspense>
        <TickersTable />
      </Suspense>
    </Stack>
  );
}

