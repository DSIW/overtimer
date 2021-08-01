import TimeLog from "../domain/TimeLog";
import { useLiveQuery } from "dexie-react-hooks";
import { timerApplicationService } from "../application/TimerApplicationService";

export function useTimeLogs() {
  return useLiveQuery(
    () => timerApplicationService.getAllTimeLogs(),
    [],
    [] as TimeLog[]
  );
}
