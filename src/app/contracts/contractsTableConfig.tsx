import { Column } from '@/hooks/table/types';
import { ContractRaw } from '@/query/contract/contractType';
import { IosShare, SaveAlt } from '@mui/icons-material';

export const contractsColumns: Column<ContractRaw>[] = [
  { id: 'cfi', header: 'CFI', enabled: true, unsortable: true },
  {
    id: 'contract_type',
    header: 'Contract type',
    cellRenderer: (result) =>
      result.contract_type === 'put' ? (
        <>
          <SaveAlt color="error" /> {result.contract_type}
        </>
      ) : (
        <>
          <IosShare color="success" /> {result.contract_type}
        </>
      ),
    enabled: true,
    unsortable: true,
  },
  { id: 'exercise_style', header: 'Exercise', enabled: true, unsortable: true },
  {
    id: 'expiration_date',
    header: 'Expiration date',
    cellRenderer: (result) => new Date(result.expiration_date).toLocaleDateString(),
    enabled: true,
  },
  { id: 'primary_exchange', header: 'Primary exchange', enabled: false, unsortable: true },
  { id: 'shares_per_contract', header: 'Shares per contract', enabled: false, unsortable: true },
  { id: 'strike_price', header: 'Strike price', enabled: true },
  { id: 'underlying_ticker', header: 'Underlying ticker', enabled: true },
];

export const contractTableCfg = {
  orderConfig: { orderKey: 'sort', directionKey: 'order' },
  customFilters: {
    type: {
      columnName: 'cfi',
      options: ['OCASPS', 'OPASPS'],
    },
    market: {
      columnName: 'contract_type',
      options: ['call', 'put'],
    },
  },
};

export type TickerTableCfgType = typeof contractTableCfg;
