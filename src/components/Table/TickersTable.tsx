'use client';

import { useSearchFilter } from '@/app/hooks/filters/useSearchFilter';
import { Column } from '@/app/hooks/table/types';
import { useTable } from '@/app/hooks/table/useTable';
import { useTickerList } from '@/query/ticker';
import { TickerRaw } from '@/query/types';
import { FC } from 'react';

const tickerColumns: Column<TickerRaw>[] = [
  { resultKey: 'name', header: 'Name' },
  { resultKey: 'ticker', header: 'Ticker' },
  { resultKey: 'market', header: 'Market' },
  {
    resultKey: 'last_updated_utc',
    header: 'Last updayed',
    cellRenderer: (result) => new Date(result.last_updated_utc).toLocaleTimeString(),
  },
];

const searchColumnName = 'search';

export const TickersTable: FC = () => {
  const { TableElement, tableElementProps, updateFilters, filters } = useTable({
    listQuery: useTickerList,
    columns: tickerColumns,
  });

  const { SearchElement, forwardedProps: searchForwardedProps } = useSearchFilter({
    columnName: searchColumnName,
    setValue: updateFilters,
    filters,
  });

  return (
    <>
      <SearchElement {...searchForwardedProps} />
      <TableElement {...tableElementProps} {...{ filters }} />
    </>
  );
};

export default TickersTable;
