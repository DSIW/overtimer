import { max, min } from "lodash";
import Statistic, { Statistics } from "./Statistic";
import Duration from "./Duration";
import median from "./median";

export default class DurationStatistic implements Statistic<number> {
  getStatistics(durationMsList: number[]): Statistics {
    return {
      min: this.formatDuration(min(durationMsList)),
      median: this.formatDuration(median(durationMsList)),
      max: this.formatDuration(max(durationMsList)),
    };
  }

  private formatDuration(milliseconds: number | undefined) {
    return new Duration(milliseconds!).getFormatted();
  }
}
