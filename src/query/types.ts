type TListRaw<TResults> = {
  count: number;
  next_url: string;
  request_id: string;
  results: TResults;
  status: string;
};

export interface TickerRaw {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
}

export type Tickers = TickerRaw[];
export type TickersResultsRaw = TListRaw<Tickers>;
