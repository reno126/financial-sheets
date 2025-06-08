'use client';

import { useSearchFilter } from '@/app/hooks/filters/useSearchFilter';
import { useColumnsFilter } from '@/app/hooks/table/useColumnsFilter';
import { useTable } from '@/app/hooks/table/useTable';
import { useTickerList } from '@/query/ticker';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { FilterAlt, Settings } from '@mui/icons-material';
import { tickerColumns, tickerTableCfg } from './tickerTableConfig';
import { MemoizedSorter } from '../Sorter/Sorter';
import { useSelectFilter } from '@/app/hooks/filters/useSelectFilter';
import { FiltersChips } from '../FiltersChips/FiltersChips';
import { DropdownPoper } from '../DropdownPoper/DropdownPoper';

export const TickersTable: FC = () => {
  const {
    ColumnsFilterElement,
    forwardedProps: tickerColumnsProps,
    enabledColumns,
  } = useColumnsFilter({
    columns: tickerColumns,
  });

  const {
    TableElement: TickerTable,
    tableElementProps,
    updateFilters,
    filters,
  } = useTable({
    listQuery: useTickerList,
    columns: enabledColumns,
    orderConfig: tickerTableCfg.orderConfig,
  });

  const { SearchElement, forwardedProps: searchForwardedProps } = useSearchFilter({
    columnName: tickerTableCfg.search.columnName,
    setValue: updateFilters,
    filters,
  });

  const { SelectFilterElement: TypeFilterElement, forwardedProps: typeSelectProps } =
    useSelectFilter({
      columnName: tickerTableCfg.customFilters.type.columnName,
      setValue: updateFilters,
      filters,
      options: tickerTableCfg.customFilters.type.options,
    });

  const { SelectFilterElement: MarketFilterElement, forwardedProps: marketSelectProps } =
    useSelectFilter({
      columnName: tickerTableCfg.customFilters.market.columnName,
      setValue: updateFilters,
      filters,
      options: tickerTableCfg.customFilters.market.options,
    });

  return (
    <>
      <Stack direction="row" spacing={2}>
        <SearchElement {...searchForwardedProps} />
        <DropdownPoper caption="type" buttonProps={{ startIcon: <FilterAlt /> }}>
          <TypeFilterElement {...typeSelectProps} />
        </DropdownPoper>
        <DropdownPoper caption="market" buttonProps={{ startIcon: <FilterAlt /> }}>
          <MarketFilterElement {...marketSelectProps} />
        </DropdownPoper>
        <DropdownPoper caption="columns" buttonProps={{ startIcon: <Settings /> }}>
          <ColumnsFilterElement {...tickerColumnsProps} />
        </DropdownPoper>
      </Stack>
      <FiltersChips {...{ filters, updateFilters, customFilters: tickerTableCfg.customFilters }} />
      <TickerTable {...tableElementProps} {...{ filters }} Sorter={MemoizedSorter} />
    </>
  );
};
