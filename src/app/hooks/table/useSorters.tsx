import { TableSortLabel } from '@mui/material';
import React from 'react';
import { OrderConfig, OrderDirection, SorterProps } from './types';
import { useStateSearchParams } from '../state/useStateSearchParams';

interface UseSorterFilterProps {
  orderConfig: OrderConfig;
}

export function useSorters({ orderConfig }: UseSorterFilterProps) {
  const [sorters, updateSorters] = useStateSearchParams();

  const SorterElement = ({ id, header }: SorterProps) => {
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

  return {
    forwardedProps: {},
    SorterElement,
  };
}

const revertDirection = (direction: string): OrderDirection =>
  direction === 'asc' ? 'desc' : 'asc';
