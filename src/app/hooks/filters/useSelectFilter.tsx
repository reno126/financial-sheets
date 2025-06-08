import React, { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { Filters } from '../table/types';

type SelectFilterElementProps = {
  selected: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: SelectFilterOptionsType;
};

type SelectFilterOptionsType = string[];

interface UseSelectFilterProps {
  columnName: string;
  options: SelectFilterOptionsType;
  setValue: (filter: Filters) => void;
  filters: Filters;
}

export function useSelectFilter({ columnName, setValue, filters, options }: UseSelectFilterProps) {
  const selectedValue = filters[columnName] ?? '';

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = e.target.name;
    setValue({
      [columnName]: checkedValue === selectedValue ? '' : checkedValue,
    });
  };

  return {
    forwardedProps: {
      handleOnChange,
      selected: selectedValue,
      options,
    },
    SelectFilterElement,
  };
}

const SelectFilterElement = ({ selected, handleOnChange, options }: SelectFilterElementProps) => {
  return (
    <Stack paddingY={1} paddingX={2}>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox checked={selected === option} onChange={handleOnChange} name={option} />
          }
          label={option}
        />
      ))}
    </Stack>
  );
};
