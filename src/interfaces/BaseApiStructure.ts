export interface BaseApiStructure<T> {
  code: string;
  cache: boolean;
  results: T;
}
