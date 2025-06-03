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
import { FC, Fragment, UIEventHandler } from 'react';
import { Column } from './types';
import { genericMemo } from '@/helpers/react';
import { StateType, useStateSearchParams } from '../state/useStateSearchParams';
import { SentimentNeutral, SentimentVeryDissatisfied } from '@mui/icons-material';
import ErrorModal from '@/components/Error/ErrorModal';

interface UseTableReturnProps<T extends RenderableRecord> {
  TableElement: FC<TableElementProps<T>>;
  tableElementProps: TableElementProps<T>;
  updateFilters: (state: StateType) => void;
  filters: StateType;
}

interface UseTableProps<T extends RenderableRecord> {
  listQuery: (queryParams?: TQueryParams) => UseInfiniteQueryResult<InfiniteData<WithUid<T>[]>>;
  columns: Column<T>[];
}

export function useTable<T extends RenderableRecord>({
  listQuery,
  columns,
}: UseTableProps<T>): UseTableReturnProps<T> {
  const [filters, updateFilters] = useStateSearchParams();
  const listQueryProps = listQuery(filters);

  return {
    TableElement,
    tableElementProps: {
      listQueryProps,
      columns,
    },
    updateFilters,
    filters,
  };
}

interface TableElementProps<T extends RenderableRecord> {
  listQueryProps: UseInfiniteQueryResult<InfiniteData<WithUid<T>[]>>;
  columns: Column<T>[];
}

const TableElement = <T extends RenderableRecord>({
  listQueryProps,
  columns,
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

  return (
    <>
      <MuiTableContainer component={Paper} onScroll={handleScroll} className="max-h-80 pb-14">
        <Table>
          <MemoizedTableHead {...{ columns }} />
          {isLoading && <MemoizedLoadingRows {...{ columns }} />}
          {isSuccess && <MemoizedTableBody {...{ data, columns }} />}
          {isFetchingNextPage && <MemoizedLoadingRows {...{ columns }} />}
          {!hasNextPage && isSuccess && <NoResults type="noMoreResults" />}
          {noResults === 0 && <NoResults type="noResults" />}
        </Table>
      </MuiTableContainer>
    </>
  );
};

interface TablePartialProps<T extends RenderableRecord> {
  data: InfiniteData<WithUid<T>[]>;
  columns: Column<T>[];
}

const TableHead = <T extends RenderableRecord>({
  columns,
}: Pick<TablePartialProps<T>, 'columns'>) => {
  return (
    <MuiTableHead>
      <TableRow>
        {columns.map(({ resultKey, header }) => (
          <TableCell key={resultKey}>{header}</TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

const MemoizedTableHead = genericMemo(TableHead);

const TableBody = <T extends RenderableRecord>({ data, columns }: TablePartialProps<T>) => {
  return (
    <MuiTableBody>
      {data.pages.map((page, i) => {
        return (
          <Fragment key={i}>
            {page.map((item) => {
              return (
                <TableRow key={item.__uid}>
                  {columns.map(({ resultKey, cellRenderer }) => {
                    const customCell = !!cellRenderer ? cellRenderer(item) : item[resultKey];
                    return <TableCell key={resultKey}>{customCell}</TableCell>;
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

const LoadingRows = <T extends RenderableRecord>({
  columns,
}: Pick<TablePartialProps<T>, 'columns'>) => {
  return (
    <MuiTableBody>
      <TableRow>
        {columns.map((ca) => (
          <TableCell key={ca.resultKey}>
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
