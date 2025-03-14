import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { get } from './fetchCrud';
import { ListResult, TQueryParams } from './types';
import { NetworkError } from '@/errors/errors';

export type PredefinedGetListQueryProps<TResult extends ListResult> = {
  path: string;
  queryParams?: TQueryParams;
  queryOptions?: Omit<QueryObserverOptions<TResult, NetworkError>, 'queryKey'>;
};

export function usePredefinedListQuery<TResult extends ListResult>({
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

