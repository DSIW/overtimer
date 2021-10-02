import { useLiveQuery } from "dexie-react-hooks";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";

export function useTimeLogCount() {
  return useLiveQuery(
    () => timeLogApplicationService.getAllCount(),
    [],
    0
  );
}
