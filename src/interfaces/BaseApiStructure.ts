export interface BaseApiStructure<T> {
  code: string;
  cache: boolean;
  results: T;
}

export interface BaseApiStructureSubjectsSearch<T> {
  code: string;
  subjects: T;
}
