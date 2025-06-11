'use client';

import { useColumnsFilter } from '@/hooks/table/useColumnsFilter';
import { useTable } from '@/hooks/table/useTable';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { Settings } from '@mui/icons-material';
import { MemoizedSorter } from '@/components/Sorter/Sorter';
import { useSelectFilter } from '@/hooks/filters/useSelectFilter';
import { FiltersChips } from '@/components/FiltersChips/FiltersChips';
import { DropdownPoper } from '@/components/DropdownPoper/DropdownPoper';
import { useContractList } from '@/query/contract/contractQuery';
import { contractsColumns, contractTableCfg } from './contractsTableConfig';
import PaperWithHeader from '@/components/Paper/PaperWithHeader';

export const ContractsTableControls: FC = () => {
  const {
    ColumnsFilterElement,
    forwardedProps: contractColumnsProps,
    enabledColumns,
  } = useColumnsFilter({
    columns: contractsColumns,
  });

  const {
    TableElement: ContractTable,
    tableElementProps,
    updateFilters,
    filters,
  } = useTable({
    listQuery: useContractList,
    columns: enabledColumns,
    orderConfig: contractTableCfg.orderConfig,
  });

  const { SelectFilterElement: TypeFilterElement, forwardedProps: typeSelectProps } =
    useSelectFilter({
      columnName: contractTableCfg.customFilters.type.columnName,
      setValue: updateFilters,
      filters,
      options: contractTableCfg.customFilters.type.options,
    });

  const { SelectFilterElement: MarketFilterElement, forwardedProps: marketSelectProps } =
    useSelectFilter({
      columnName: contractTableCfg.customFilters.market.columnName,
      setValue: updateFilters,
      filters,
      options: contractTableCfg.customFilters.market.options,
    });

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="end">
        <PaperWithHeader header="CFI">
          <TypeFilterElement {...typeSelectProps} />
        </PaperWithHeader>
        <PaperWithHeader header="Contract type">
          <MarketFilterElement {...marketSelectProps} />
        </PaperWithHeader>
        <DropdownPoper caption="columns" buttonProps={{ startIcon: <Settings /> }}>
          <ColumnsFilterElement {...contractColumnsProps} />
        </DropdownPoper>
      </Stack>
      <FiltersChips
        {...{ filters, updateFilters, customFilters: contractTableCfg.customFilters }}
      />
      <ContractTable {...tableElementProps} {...{ filters }} Sorter={MemoizedSorter} />
    </>
  );
};
