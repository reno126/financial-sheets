import { ReactNode } from 'react';

export interface Column<T> {
  resultKey: string & keyof T;
  header: string;
  cellRenderer?: (result: T) => ReactNode;
}
