'use client';

import { useTickerList } from '@/query/ticker';

export const Grid: React.FC = () => {
  const {
    data: tickersList,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useTickerList({ active: 'true', limit: '10' });

  if (isError) {
    console.log(error);
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    console.log(tickersList.results);
    return <div>{JSON.stringify(tickersList.results)} </div>;
  }

  return <div>No active tickes</div>;
};

export default Grid;
