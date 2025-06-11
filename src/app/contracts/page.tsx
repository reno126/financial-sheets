import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import { ContractsTableControls } from './ContractsTableControls';

export default function Page() {
  return (
    <Stack spacing={2}>
      <Typography variant="h3" component="h3">
        Contracts list
      </Typography>
      <Suspense>
        <ContractsTableControls />
      </Suspense>
    </Stack>
  );
}
