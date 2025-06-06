'use client';

import { useSearchFilter } from '@/app/hooks/filters/useSearchFilter';
import { useColumnsFilter } from '@/app/hooks/table/useColumnsFilter';
import { useTable } from '@/app/hooks/table/useTable';
import { useTickerList } from '@/query/ticker';
import { Stack } from '@mui/material';
import { FC } from 'react';
import DropdownPoper from '../DropdownPoper/DropdownPoper';
import { Settings } from '@mui/icons-material';
import { orderConfig, searchColumnName, tickerColumns } from './tickerTableConfig';
import { MemoizedSorter } from '../Sorter/Sorter';

export const TickersTable: FC = () => {
  const {
    ColumnsFilterElement,
    forwardedProps: tickerColumnsProps,
    enabledColumns,
  } = useColumnsFilter({
    columns: tickerColumns,
  });

  const { TableElement, tableElementProps, updateFilters, filters } = useTable({
    listQuery: useTickerList,
    columns: enabledColumns,
    orderConfig,
  });

  const { SearchElement, forwardedProps: searchForwardedProps } = useSearchFilter({
    columnName: searchColumnName,
    setValue: updateFilters,
    filters,
  });

  return (
    <>
      <Stack direction="row" spacing={2}>
        <SearchElement {...searchForwardedProps} />
        <DropdownPoper caption="columns" buttonProps={{ startIcon: <Settings /> }}>
          <ColumnsFilterElement {...tickerColumnsProps} />
        </DropdownPoper>
      </Stack>

      <TableElement {...tableElementProps} {...{ filters }} Sorter={MemoizedSorter} />
    </>
  );
};

export default TickersTable;
