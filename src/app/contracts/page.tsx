import { Stack } from '@mui/material';
import { Suspense } from 'react';
import { ContractsTableControls } from './ContractsTableControls';
import { PageHeader } from '@/components/Headers/PageHeader';

export default function ContractsPage() {
  return (
    <Stack spacing={3}>
      <PageHeader header="Contracts list" />
      <Suspense>
        <ContractsTableControls />
      </Suspense>
    </Stack>
  );
}
