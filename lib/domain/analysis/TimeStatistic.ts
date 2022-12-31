import { format, max, min } from "date-fns";
import median from "./median";
import Statistic, { Statistics } from "./Statistic";

export default class TimeStatistic implements Statistic<Date> {
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
    return new Date(median(times.map((t) => +t)));
  }

  private formatTime(date: Date) {
    return format(date, "HH:mm:SS");
  }
}
