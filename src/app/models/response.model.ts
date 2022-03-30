export interface LazyResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
