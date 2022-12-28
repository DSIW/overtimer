import { isBefore, max, min } from "date-fns";

export interface TimeStatistics {
  min: Date;
  median: Date;
  max: Date;
}

export default class TimeStatistic {
  constructor(private readonly times: Date[]) {}

  getTimeStatistics(): TimeStatistics {
    const minStartTime = min(this.times);
    const medianStartTime = this.median(this.times);
    const maxStartTime = max(this.times);
    return {
      min: minStartTime,
      median: medianStartTime,
      max: maxStartTime,
    };
  }

  private median(times: Date[]) {
    const sorted = times.sort((a, b) => (isBefore(a, b) ? -1 : 1));
    const middleIndex = Math.floor(times.length / 2);
    return sorted[middleIndex];
  }
}
