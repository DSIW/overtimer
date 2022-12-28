import { max, min } from "lodash";
import Statistic, { Statistics } from "./Statistic";
import Duration from "./Duration";

export default class DurationStatistic implements Statistic<number> {
  getStatistics(durationMsList: number[]): Statistics {
    return {
      min: this.formatDuration(min(durationMsList)),
      median: this.formatDuration(this.median(durationMsList)),
      max: this.formatDuration(max(durationMsList)),
    };
  }

  private median(times: number[]) {
    const sorted = times.sort((a, b) => b - a);
    const middleIndex = Math.floor(times.length / 2);
    return sorted[middleIndex];
  }

  private formatDuration(milliseconds: number | undefined) {
    return new Duration(milliseconds!).getFormatted();
  }
}
