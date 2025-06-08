import { ReactNode } from 'react';
import { StateType } from '../state/useStateSearchParams';

export interface Column<T> {
  id: string & keyof T;
  header: string;
  cellRenderer?: (result: T) => ReactNode;
  enabled?: boolean;
}

export interface SorterProps {
  id: string;
  header: string;
  orderConfig: OrderConfig;
}

export type OrderDirection = 'asc' | 'desc';

export interface OrderConfig {
  orderKey: string;
  directionKey: string;
}

export type Filters = StateType;
