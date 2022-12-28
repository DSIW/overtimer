import { format, isBefore, max, min } from "date-fns";
import Statistic, { Statistics } from "./Statistic";

export default class TimeStatistic implements Statistic<Date>{
  getStatistics(times: Date[]): Statistics {
    const minStartTime = min(times);
    const medianStartTime = this.median(times);
    const maxStartTime = max(times);
    return {
      min: this.formatTime(minStartTime),
      median: this.formatTime(medianStartTime),
      max: this.formatTime(maxStartTime),
    };
  }

  private median(times: Date[]) {
    const sorted = times.sort((a, b) => (isBefore(a, b) ? -1 : 1));
    const middleIndex = Math.floor(times.length / 2);
    return sorted[middleIndex];
  }

  private formatTime(date: Date) {
    return format(date, "HH:mm:SS");
  }
}
