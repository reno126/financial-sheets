import { useStateSearchParams } from '@/app/hooks/state/useStateSearchParams';
import { SorterProps, OrderDirection } from '@/app/hooks/table/types';
import { TableSortLabel } from '@mui/material';
import { memo } from 'react';

const Sorter = ({ id, header, orderConfig }: SorterProps) => {
  const [sorters, updateSorters] = useStateSearchParams();

  const { orderKey, directionKey } = orderConfig;
  const sortBy = sorters?.[orderKey];
  const orderDirection = sorters?.[directionKey] as OrderDirection;

  const sortHandler = (id: string) => {
    const getOrderDirection = sorters?.sort === id ? revertDirection(sorters?.order) : 'asc';
    updateSorters({ [directionKey]: getOrderDirection, [orderKey]: id });
  };

  return (
    <TableSortLabel
      active={sortBy === id}
      direction={orderDirection}
      onClick={() => sortHandler(id)}
    >
      {header}
    </TableSortLabel>
  );
};

export const MemoizedSorter = memo(Sorter);

const revertDirection = (direction: string): OrderDirection =>
  direction === 'asc' ? 'desc' : 'asc';
