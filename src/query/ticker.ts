import { usePredefinedListQuery } from '@/client/predefinedQuery';
import { TickersResultsRaw } from './types';
import { TQueryParams } from '@/client/types';

export const useTickerList = (queryParams?: TQueryParams) => {
  return usePredefinedListQuery<TickersResultsRaw>({
    path: 'tickers',
    queryParams,
    queryOptions: {
      retry: false,
      select: (data) => ({
        ...data,
        results: data.results.map((result) => ({
          ...result,
          __uid: result.composite_figi + result.cik?.toString() + result.ticker,
        })),
      }),
    },
  });
};
