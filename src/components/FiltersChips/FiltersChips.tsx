import { Paper, Stack, Typography, Chip } from '@mui/material';
import { Filters } from '@/hooks/table/types';
import { TickerTableCfgType } from '@/app/tickers/tickerTableConfig';

export interface FiltersChipsProps {
  customFilters: TickerTableCfgType['customFilters'];
  filters: Filters;
  updateFilters: (filter: Filters) => void;
}

export const FiltersChips: React.FC<FiltersChipsProps> = ({
  customFilters,
  filters,
  updateFilters,
}) => {
  const customFiltersKeys = Object.keys(customFilters);
  const customfiltersList = Object.entries(filters).filter((filter) =>
    customFiltersKeys.includes(filter.at(0) ?? '')
  );

  const handleDeleteFilter = (filterName: string) => {
    updateFilters({ [filterName]: '' });
  };

  if (customfiltersList.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ padding: 1 }} className="flex space-x-8">
      {customfiltersList.map((fl) => (
        <Stack key={fl.at(0)} direction="row" spacing={1} alignItems="center">
          <Typography className="capitalize">{fl.at(0)}:</Typography>
          <Chip
            label={fl.at(1)}
            variant="outlined"
            onDelete={() => handleDeleteFilter(fl.at(0) ?? '')}
          />
        </Stack>
      ))}
    </Paper>
  );
};
