import { Column } from '@/hooks/table/types';
import { TickerRaw } from '@/query/ticker/tickerType';

export const tickerColumns: Column<TickerRaw>[] = [
  { id: 'name', header: 'Name', enabled: true },
  { id: 'ticker', header: 'Ticker', enabled: true },
  { id: 'market', header: 'Market', enabled: true },
  {
    id: 'last_updated_utc',
    header: 'Last updayed',
    cellRenderer: (result) => new Date(result.last_updated_utc).toLocaleDateString(),
    enabled: true,
  },
  { id: 'currency_name', header: 'Currency Name', enabled: false },
  { id: 'primary_exchange', header: 'Primary Exchange', enabled: false },
  { id: 'share_class_figi', header: 'Share Class', enabled: false },
  { id: 'type', header: 'Type', enabled: false },
];

export const tickerTableCfg = {
  search: { columnName: 'search' },
  orderConfig: { orderKey: 'sort', directionKey: 'order' },
  customFilters: {
    type: {
      columnName: 'type',
      options: ['ETF', 'FUND', 'CS', 'OS', 'RIGHT', 'WARRANT', 'UNIT', 'ADRC'],
    },
    market: {
      columnName: 'market',
      options: ['stocks', 'otc', 'crypto'],
    },
  },
};

export type TickerTableCfgType = typeof tickerTableCfg;
