import { usePredefinedListQuery } from '@/client/predefinedQuery';
import { TickersResults } from './types';
import { TQueryParams } from '@/client/types';

export const useTickerList = (queryParams?: TQueryParams) => {
  return usePredefinedListQuery<TickersResults>({
    path: 'tickers',
    queryParams,
    queryOptions: { retry: false },
  });
};
