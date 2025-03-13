import { TQueryParams } from './types';
import { anyToError } from '@/helpers/errors';
import { NetworkError } from '@/errors/errors';
import { createUri } from '@/helpers/createUri';

export const get = async <TResult>(path: string, searchParams?: TQueryParams): Promise<TResult> => {
  try {
    const uri = createUri('api/polygon/', path, searchParams);
    const response = await fetch(uri);
    if (!response.ok) {
      throw new NetworkError('Network error', { context: 'fetch.get' }, response.status);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw anyToError(e);
  }
};

