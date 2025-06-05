import { Column } from '@/app/hooks/table/types';
import { TickerRaw } from '@/query/types';

export const tickerColumns: Column<TickerRaw>[] = [
  { id: 'name', header: 'Name', enabled: true },
  { id: 'ticker', header: 'Ticker', enabled: true },
  { id: 'market', header: 'Market', enabled: true },
  {
    id: 'last_updated_utc',
    header: 'Last updayed',
    cellRenderer: (result) => new Date(result.last_updated_utc).toLocaleTimeString(),
    enabled: true,
  },
  { id: 'currency_name', header: 'Currency Name', enabled: false },
  { id: 'primary_exchange', header: 'Primary Exchange', enabled: false },
  { id: 'share_class_figi', header: 'Share Class', enabled: false },
  { id: 'type', header: 'Type', enabled: false },
];

export const searchColumnName = 'search';
