export function createUrl(
  host: string,
  path: string | string[] = '',
  searchParams?: Record<string, string> | URLSearchParams
): string {
  const searchParamsString = new URLSearchParams(searchParams).toString().replace(/./, '?$&');
  const pathString = Array.isArray(path) ? path.join('/') : path;
  const uri = host + pathString + searchParamsString;
  return uri;
}
