import { isArray, isEmpty } from 'lodash';

export function createUri(
  host: string,
  path?: string | string[],
  searchParams?: Record<string, string> | URLSearchParams
): string {
  const searchParamsString = isEmpty(searchParams) ? '' : '?' + new URLSearchParams(searchParams);
  const pathString = isArray(path) ? path.join('/') : (path ?? '');
  const uri = host + pathString + searchParamsString;
  return uri;
}
