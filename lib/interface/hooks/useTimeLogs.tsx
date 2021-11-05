import { useLiveQuery } from "dexie-react-hooks";
import TimeLog from "../../domain/TimeLog";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";

export function useTimeLogs(weekLimit: number) {
  return useLiveQuery(
    () => timeLogApplicationService.getAllRecentTimeLogs(weekLimit),
    [],
    [] as TimeLog[]
  );
}
