import { max, min } from "lodash";
import Statistic, { Statistics } from "./Statistic";
import median from "./median";

export default class DurationStatistic implements Statistic<number, number> {
  getStatistics(durationMsList: number[]): Statistics<number> {
    return {
      min: min(durationMsList) as number,
      median: median(durationMsList),
      max: max(durationMsList) as number,
    };
  }
}
