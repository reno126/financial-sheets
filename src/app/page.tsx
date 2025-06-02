import TickersTable from '@/components/Table/TickersTable';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <h1 className="mb-4">This is Financial sheets!</h1>
      <TickersTable />
    </Suspense>
  );
}

