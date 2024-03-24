import TimeLog from "../../domain/TimeLog";
import * as DateFns from "date-fns";
import { TimeLogEventTargetName } from "./ChangeEvent";

export interface State {
  timeLog: TimeLog;
  error: boolean;
}

export type Payload = {
  name: TimeLogEventTargetName;
  hours: number;
  minutes: number;
};

export function updateTime(state: State, payload: Payload) {
  const { name, hours, minutes } = payload;

  const timeLog = state.timeLog;
  const updateAttribute = timeLog[name];

  if (updateAttribute === undefined) {
    return state;
  }

  let updatedTime = state.timeLog.startTime;
  updatedTime = DateFns.setHours(updatedTime, hours);
  updatedTime = DateFns.setMinutes(updatedTime, minutes);
  updatedTime = DateFns.setSeconds(updatedTime, 0);

  const valid = DateFns.isValid(updatedTime);

  if (!valid) {
    return { ...state, error: true };
  }

  const updatedTimeLog = new TimeLog({
    id: timeLog.id,
    startTime: resetSeconds(timeLog.startTime),
    endTime: timeLog.endTime && resetSeconds(timeLog.endTime),
    [name]: updatedTime,
  });

  const error = !updatedTimeLog.isValid();

  if (error) {
    return { ...state, error };
  }

  return { timeLog: updatedTimeLog, error };
}

function resetSeconds(time: Date): Date {
  return DateFns.setSeconds(time, 0);
}
