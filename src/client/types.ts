export type TQueryParams = Record<string, string>;

type RenderableType = string | number | boolean | null | undefined;

export type RenderableRecord = Record<string, RenderableType>;

export interface ResultListRaw<T> {
  results: T[];
  next_url?: string;
}

export type WithUid<T> = T & { __uid: string };
