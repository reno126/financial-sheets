export type TQueryParams = Record<string, string>;

type RenderableType = string | number | boolean | null | undefined;
export interface Result extends Record<string, RenderableType> {
  __uid: string;
}
export interface ListResult {
  results: Result[];
}

export type ResultKeys = Array<keyof Result>;
