import { SearchInput, SearchInputProps } from '@/components/SearchInput';
import React, {
  ChangeEvent,
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';
import { Filters } from '../table/types';

type SearchElementProps = {
  value: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnClearClick: MouseEventHandler<HTMLButtonElement>;
  searchInputRef: RefObject<HTMLInputElement | null>;
} & SearchInputProps;

interface UseSearchFilterProps {
  columnName: string;
  setValue: (filter: Filters) => void;
  filters: Filters;
  debounce?: number;
}

export function useSearchFilter({
  columnName,
  setValue,
  filters,
  debounce = 400,
}: UseSearchFilterProps) {
  const inputInitValue = filters[columnName] ?? '';
  const [inputValue, setInputValue] = useState<string>(inputInitValue);
  const [text] = useDebounce(inputValue, debounce);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue({
      [columnName]: text,
    });
  }, [text]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnClearClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!!inputValue) {
      setValue({
        [columnName]: '',
      });
      setInputValue('');
    }
    searchInputRef.current?.focus();
  };

  return {
    forwardedProps: {
      handleOnChange,
      value: inputValue,
      handleOnClearClick,
      searchInputRef,
    },
    SearchElement,
  };
}

const SearchElement = ({
  value,
  handleOnChange,
  handleOnClearClick,
  searchInputRef,
}: SearchElementProps) => {
  return (
    <SearchInput
      value={value}
      onChange={handleOnChange}
      onClearClick={handleOnClearClick}
      inputRef={searchInputRef}
    />
  );
};
