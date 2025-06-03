import { usePredefinedInfiniteQuery } from '@/client/predefinedQuery';
import { TickerRaw } from './types';
import { ResultListRaw, TQueryParams, WithUid } from '@/client/types';
import { InfiniteData } from '@tanstack/react-query';

export const useTickerList = (queryParams?: TQueryParams) => {
  return usePredefinedInfiniteQuery<ResultListRaw<TickerRaw>, InfiniteData<WithUid<TickerRaw>[]>>({
    path: 'tickers',
    queryKey: ['tickers', queryParams],
    queryParams: { limit: '20', ...queryParams },
    options: {
      select: (data) => {
        return {
          pages: data.pages.map((page) =>
            page.results.map((result) => ({
              ...result,
              __uid: result.composite_figi + result.cik?.toString() + result.ticker,
            }))
          ),
          pageParams: data.pageParams,
        };
      },
    },
  });
};
