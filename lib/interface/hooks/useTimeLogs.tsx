import { useLiveQuery } from "dexie-react-hooks";
import TimeLog from "../../domain/TimeLog";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";
import { WEEK_LIMIT } from "../../domain/time-constants";

export function useTimeLogs(weeks: number = WEEK_LIMIT) {
  return useLiveQuery(
    () => timeLogApplicationService.getAllRecentTimeLogs(weeks),
    [weeks],
    [] as TimeLog[]
  );
}
