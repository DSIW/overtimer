import { useLiveQuery } from "dexie-react-hooks";
import TimeLog from "../../domain/TimeLog";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";
import { DEFAULT_TIME_RANGE_OPTION_ID } from "../../domain/time-constants";

export function useTimeLogs(
  timeRangeOptionId: string = DEFAULT_TIME_RANGE_OPTION_ID
) {
  return useLiveQuery(
    () => timeLogApplicationService.getAllRecentTimeLogs(timeRangeOptionId),
    [timeRangeOptionId],
    [] as TimeLog[]
  );
}
