import { Stack } from '@mui/material';
import { Suspense } from 'react';
import { TickersTableControls } from './TickersTableControls';
import { PageHeader } from '@/components/Headers/PageHeader';

export default function TickersPage() {
  return (
    <Stack spacing={3}>
      <PageHeader header="Tickers list" />
      <Suspense>
        <TickersTableControls />
      </Suspense>
    </Stack>
  );
}
