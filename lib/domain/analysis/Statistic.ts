export interface Statistics<T> {
  min: T;
  median: T;
  max: T;
}

export default interface Statistic<T, S> {
  getStatistics(values: T[]): Statistics<S>;
}
