import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export type StateType = Record<string, string>;

export function useStateSearchParams() {
  const initialSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setState = (state: StateType) => {
    const currentSearchParams = getCurrentSearchParams(initialSearchParams);
    const mergedSearchParamsWithState = { ...currentSearchParams, ...state };
    const mergedNoEmpty = Object.fromEntries(
      Object.entries(mergedSearchParamsWithState).filter(([, v]) => v != '')
    );
    const newSearchParams = '?' + new URLSearchParams(mergedNoEmpty);
    router.replace(pathname + newSearchParams);
  };

  const state = getCurrentSearchParams(initialSearchParams);

  return [state, setState] as const;
}

const getCurrentSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  return Object.fromEntries(searchParams);
};
