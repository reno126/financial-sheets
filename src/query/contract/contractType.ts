import { RenderableRecord } from '@/client/types';

export interface ContractRaw extends RenderableRecord {
  cfi: string;
  contract_type: string;
  exercise_style: string;
  expiration_date: string;
  primary_exchange: string;
  shares_per_contract: number;
  strike_price: number;
  ticker: string;
  underlying_ticker: string;
}
