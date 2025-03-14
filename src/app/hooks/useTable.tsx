import { ListResult, ResultKeys, TQueryParams } from '@/client/types';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { FC } from 'react';

interface UseTableReturnProps {
  TableElement: FC;
}

interface UseTableProps<TResult> {
  listQuery: (queryParams?: TQueryParams) => UseQueryResult<TResult>;
  resultKeys: ResultKeys;
}

export function useTable<TResult extends ListResult>({
  listQuery,
  resultKeys,
}: UseTableProps<TResult>): UseTableReturnProps {
  const { data, isLoading, isSuccess, isError, error } = listQuery();

  const TableElement = () => {
    if (isError) {
      console.log(error);
      return <div>Error...</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isSuccess) {
      console.log(data.results);
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {resultKeys.map((resultKey) => (
                  <TableCell key={resultKey}>{resultKey}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results.map((results) => {
                return (
                  <TableRow key={results.__uid}>
                    {resultKeys.map((resultKey) => (
                      <TableCell key={resultKey}>{results[resultKey]}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return <div>No active tickes</div>;
  };

  return {
    TableElement,
  };
}
