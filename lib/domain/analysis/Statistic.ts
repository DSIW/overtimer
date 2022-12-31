export interface Statistics {
  min: string;
  median: string;
  max: string;
}

export default interface Statistic<T> {
  getStatistics(values: T[]): Statistics;
}
