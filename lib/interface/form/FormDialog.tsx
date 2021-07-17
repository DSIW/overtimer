import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import {useState} from 'react';
import TimeLog from '../../domain/TimeLog'
import {TimeField} from "./TimeField";
import ChangeEvent, {TimeLogEventTarget} from "./ChangeEvent";
import {isValid, setHours, setMinutes, setSeconds} from "date-fns";

interface Props {
  open: boolean;
  timeLog: TimeLog;
  onCancel: () => void;
  onSubmit: (timeLog: TimeLog) => void;
}

export default function FormDialog(props: Props) {
  const {open, onCancel, onSubmit} = props;

  const [error, setError] = useState(false)

  const [timeLog, setTimeLog] = useState(props.timeLog)
  const endTime = timeLog.endTime;

  function handleTime(event: ChangeEvent) {
    const { name, value } = event.target as TimeLogEventTarget;
    const [hours, minutes] = value.split(':')

    const updateAttribute = timeLog[name];

    if (updateAttribute === undefined) {
      return;
    }

    let updatedTime = setHours(updateAttribute, +hours)
    updatedTime = setMinutes(updatedTime, +minutes)
    updatedTime = setSeconds(updatedTime, 0)

    const valid = isValid(updatedTime);

    if (!valid) {
      setError(true)
      return;
    }

    const updatedTimeLog = new TimeLog({
      startTime: resetSeconds(timeLog.startTime),
      endTime: timeLog.endTime && resetSeconds(timeLog.endTime),
      [name]: updatedTime
    });

    setTimeLog(updatedTimeLog);
  }

  function resetSeconds(time: Date): Date {
    return setSeconds(time, 0);
  }

  function handleCancel() {
    onCancel()
  }

  function handleSubmit() {
    if (timeLog.isValid()) {
      onSubmit(timeLog)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
      <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TimeField name="startTime" label="Start" defaultTime={timeLog.startTime} error={error}
                     onChange={handleTime}/>
          {endTime && (
              <TimeField name="endTime" label="End" defaultTime={endTime} error={error}
                         onChange={handleTime}/>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  )
}
