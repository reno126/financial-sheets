import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { MouseEventHandler } from 'react';

export type SearchInputProps = TextFieldProps & {
  onClearClick?: MouseEventHandler<HTMLButtonElement>;
};

export const SearchInput: React.FC<SearchInputProps> = ({ onClearClick, ...props }) => {
  return (
    <TextField
      {...props}
      label="Search"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onClearClick} edge="end">
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchInput;
