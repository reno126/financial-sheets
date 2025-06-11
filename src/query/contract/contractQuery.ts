import { usePredefinedInfiniteQuery } from '@/client/predefinedQuery';
import { ResultListRaw, TQueryParams, WithUid } from '@/client/types';
import { InfiniteData } from '@tanstack/react-query';
import { ContractRaw } from './contractType';

export const useContractList = (queryParams?: TQueryParams) => {
  return usePredefinedInfiniteQuery<
    ResultListRaw<ContractRaw>,
    InfiniteData<WithUid<ContractRaw>[]>
  >({
    path: 'options/contracts',
    queryKey: ['contracts', queryParams],
    queryParams: { limit: '20', ...queryParams },
    options: {
      select: (data) => {
        return {
          pages: data.pages.map((page) =>
            page.results.map((result) => ({
              ...result,
              __uid: result.ticker,
            }))
          ),
          pageParams: data.pageParams,
        };
      },
    },
  });
};
