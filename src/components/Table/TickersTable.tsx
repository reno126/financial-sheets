'use client';

import { useTable } from '@/app/hooks/useTable';
import { useTickerList } from '@/query/ticker';
import { TickerRaw } from '@/query/types';
import { Typography } from '@mui/material';
import { FC } from 'react';

const tickersTableKeys: Array<keyof TickerRaw> = ['name', 'ticker'];

export const TickersTable: FC = () => {
  const { TableElement } = useTable({
    listQuery: useTickerList,
    resultKeys: tickersTableKeys,
  });
  return (
    <div>
      <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
        Tickers list
      </Typography>
      <TableElement />
    </div>
  );
};

export default TickersTable;
