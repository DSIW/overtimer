import { useLiveQuery } from "dexie-react-hooks";
import TimeLog from "../../domain/TimeLog";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";

export function useTimeLogs() {
  return useLiveQuery(
    () => timeLogApplicationService.getAllTimeLogs(),
    [],
    [] as TimeLog[]
  );
}
