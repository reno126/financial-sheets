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
import { useSorters } from '@/app/hooks/table/useSorters';

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
  });

  const { SearchElement, forwardedProps: searchForwardedProps } = useSearchFilter({
    columnName: searchColumnName,
    setValue: updateFilters,
    filters,
  });

  const { SorterElement } = useSorters({ orderConfig });

  return (
    <>
      <Stack direction="row" spacing={2}>
        <SearchElement {...searchForwardedProps} />
        <DropdownPoper caption="columns" buttonProps={{ startIcon: <Settings /> }}>
          <ColumnsFilterElement {...tickerColumnsProps} />
        </DropdownPoper>
      </Stack>

      <TableElement {...tableElementProps} {...{ filters }} Sorter={SorterElement} />
    </>
  );
};

export default TickersTable;
