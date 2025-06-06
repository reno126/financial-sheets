import { WithUid, TQueryParams, RenderableRecord } from '@/client/types';
import {
  TableContainer as MuiTableContainer,
  Paper,
  Table,
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
  TableBody as MuiTableBody,
  Skeleton,
  Box,
} from '@mui/material';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { createContext, FC, Fragment, UIEventHandler, useContext } from 'react';
import { Column, OrderConfig, SorterProps } from './types';
import { genericMemo } from '@/helpers/react';
import { StateType, useStateSearchParams } from '../state/useStateSearchParams';
import { SentimentNeutral, SentimentVeryDissatisfied } from '@mui/icons-material';
import ErrorModal from '@/components/Error/ErrorModal';

interface UseTableReturnProps<T extends RenderableRecord> {
  TableElement: FC<TableElementProps<T>>;
  tableElementProps: Omit<TableElementProps<T>, 'Sorter'>;
  updateFilters: (state: StateType) => void;
  filters: StateType;
}

interface UseTableProps<T extends RenderableRecord> {
  listQuery: (queryParams?: TQueryParams) => UseInfiniteQueryResult<InfiniteData<WithUid<T>[]>>;
  columns: Column<T>[];
  orderConfig: OrderConfig;
}

export function useTable<T extends RenderableRecord>({
  listQuery,
  columns,
  orderConfig,
}: UseTableProps<T>): UseTableReturnProps<T> {
  const [filters, updateFilters] = useStateSearchParams();

  const listQueryProps = listQuery(filters);

  return {
    TableElement,
    tableElementProps: {
      listQueryProps,
      columns,
      orderConfig,
    },
    updateFilters,
    filters,
  };
}

interface TableElementProps<T> {
  listQueryProps: UseInfiniteQueryResult<InfiniteData<WithUid<T>[]>>;
  columns: Column<T>[];
  Sorter: FC<SorterProps>;
  orderConfig: OrderConfig;
}

const TableContext = createContext({} as TableElementProps<unknown>);

const TableElement = <T extends RenderableRecord>({
  listQueryProps,
  columns,
  Sorter,
  orderConfig,
}: TableElementProps<T>) => {
  const {
    data,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = listQueryProps;

  const handleScroll: UIEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLElement;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const noResults = data?.pages[0].length;

  if (isError) {
    return <ErrorModal error={error} onRetry={refetch} />;
  }

  const contextValue = {
    data,
    columns: columns as Column<unknown>[],
    Sorter,
    orderConfig,
    listQueryProps,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <MuiTableContainer component={Paper} onScroll={handleScroll} className="max-h-80 pb-14">
        <Table>
          <MemoizedTableHead />
          {isLoading && <MemoizedLoadingRows />}
          {isSuccess && <MemoizedTableBody />}
          {isFetchingNextPage && <MemoizedLoadingRows />}
          {!hasNextPage && isSuccess && <NoResults type="noMoreResults" />}
          {noResults === 0 && <NoResults type="noResults" />}
        </Table>
      </MuiTableContainer>
    </TableContext.Provider>
  );
};

const TableHead = () => {
  const { columns, Sorter, orderConfig } = useContext(TableContext);
  return (
    <MuiTableHead>
      <TableRow>
        {columns.map(({ id, header }) => (
          <TableCell key={id}>
            <Sorter {...{ id, header, orderConfig }} />
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

const MemoizedTableHead = genericMemo(TableHead);

const TableBody = () => {
  const {
    columns,
    listQueryProps: { data },
  } = useContext(TableContext);

  return (
    <MuiTableBody>
      {data?.pages.map((page, i) => {
        return (
          <Fragment key={i}>
            {page.map((item) => {
              return (
                <TableRow key={item.__uid}>
                  {columns.map(({ id, cellRenderer }) => {
                    const customCell = !!cellRenderer ? cellRenderer(item) : item[id];
                    return <TableCell key={id}>{customCell}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </Fragment>
        );
      })}
    </MuiTableBody>
  );
};
const MemoizedTableBody = genericMemo(TableBody);

const LoadingRows = () => {
  const { columns } = useContext(TableContext);
  return (
    <MuiTableBody>
      <TableRow>
        {columns.map((ca) => (
          <TableCell key={ca.id}>
            <Skeleton variant="rectangular" height={20} animation="wave" />
          </TableCell>
        ))}
      </TableRow>
    </MuiTableBody>
  );
};

const MemoizedLoadingRows = genericMemo(LoadingRows);

const NoResults = ({ type }: { type: 'noResults' | 'noMoreResults' }) => {
  const ResultContet = () => (
    <>
      {type === 'noResults' && (
        <>
          <SentimentVeryDissatisfied /> Sorry, no results.
        </>
      )}
      {type === 'noMoreResults' && (
        <>
          <SentimentNeutral /> That&apos;s all results.
        </>
      )}
    </>
  );
  return (
    <MuiTableBody>
      <TableRow>
        <TableCell>
          <Box className={type === 'noResults' ? 'text-red-500' : 'text-blue-500'} component="span">
            <ResultContet />
          </Box>
        </TableCell>
      </TableRow>
    </MuiTableBody>
  );
};
