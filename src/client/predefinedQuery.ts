import {
  DefaultError,
  GetNextPageParamFunction,
  QueryKey,
  QueryObserverOptions,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { get } from './fetchCrud';
import { TQueryParams } from './types';
import { NetworkError } from '@/errors/errors';

export type PredefinedGetListQueryProps<T> = {
  path: string;
  queryParams?: TQueryParams;
  queryOptions?: Omit<QueryObserverOptions<T, NetworkError>, 'queryKey'>;
};

interface PredefinedInfiniteQueryProps<
  TQueryFnData extends { next_url?: string },
  TData,
  TQueryKey extends QueryKey = QueryKey,
  TError = DefaultError,
> {
  path: string;
  queryKey: TQueryKey;
  queryParams?: TQueryParams;
  options?: Omit<
    UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TQueryParams>,
    'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'queryKey'
  > & { getNextPageParam?: GetNextPageParamFunction<TQueryParams, TQueryFnData> };
}

export function usePredefinedInfiniteQuery<
  TQueryFnData extends { next_url?: string },
  TData,
  TQueryKey extends QueryKey = QueryKey,
>({
  path,
  queryKey,
  queryParams,
  options,
}: PredefinedInfiniteQueryProps<
  TQueryFnData,
  TData,
  TQueryKey,
  NetworkError
>): UseInfiniteQueryResult<TData, NetworkError> {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      const mergedQueryParams = { ...pageParam, ...queryParams };
      return get<TQueryFnData>(path, mergedQueryParams);
    },
    queryKey,
    initialPageParam: {},
    getNextPageParam: getNextPageCursor,
    retry: false,
    ...options,
  });
}

function getNextPageCursor<T extends { next_url?: string }>(lastPage: T): TQueryParams | null {
  if (lastPage?.next_url) {
    return {
      cursor: lastPage?.next_url?.substring(lastPage.next_url.indexOf('cursor=') + 7) ?? '',
    };
  }
  return null;
}

