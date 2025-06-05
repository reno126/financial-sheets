import { ReactNode } from 'react';

export interface Column<T> {
  id: string & keyof T;
  header: string;
  cellRenderer?: (result: T) => ReactNode;
  enabled?: boolean;
}

export type OrderDirection = 'asc' | 'desc';

export interface OrderConfig {
  orderKey: string;
  directionKey: string;
}
