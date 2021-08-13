import { useLiveQuery } from "dexie-react-hooks";
import { timerApplicationService } from "../../application/TimerApplicationService";
import TimeLog from "../../domain/TimeLog";

export function useTimeLogs() {
  return useLiveQuery(
    () => timerApplicationService.getAllTimeLogs(),
    [],
    [] as TimeLog[]
  );
}
