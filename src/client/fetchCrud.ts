import { TQueryParams } from './types';
import { anyToError } from '@/helpers/errors';
import { NetworkError } from '@/errors/errors';
import { createUrl } from '@/helpers/createUri';

export const get = async <TResult>(path: string, searchParams?: TQueryParams): Promise<TResult> => {
  try {
    const uri = createUrl('api/polygon/', path, searchParams);
    const response = await fetch(uri);
    if (!response.ok) {
      const message = await response.text();
      throw new NetworkError(message, { context: 'fetch.get' }, response.status);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw anyToError(e);
  }
};

