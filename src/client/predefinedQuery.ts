import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { get } from './fetchCrud';
import { TQueryParams } from './types';
import { NetworkError } from '@/errors/errors';

export type GetWrapper<T> = {
  data: T;
  message: string;
};

export type GetListWrapper<T> = {
  data: T[];
  message: string;
  total_items_count: number;
};

export type PredefinedGetListQueryProps<TResult> = {
  path: string;
  queryParams?: TQueryParams;
  queryOptions?: Omit<QueryObserverOptions<TResult, NetworkError>, 'queryKey'>;
};

export function usePredefinedListQuery<TResult>({
  path,
  queryParams,
  queryOptions,
}: PredefinedGetListQueryProps<TResult>) {
  return useQuery<TResult, NetworkError>({
    queryFn: () => {
      const getRet = get<TResult>(path, queryParams);
      console.log(getRet);

      return getRet;
    },
    ...queryOptions,
    queryKey: [...path.split('/'), new URLSearchParams(queryParams)],
  });
}

