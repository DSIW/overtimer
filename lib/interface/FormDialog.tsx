import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core'
import { useState } from 'react';
import TimeLog from '../domain/TimeLog'
import { format } from 'date-fns'

const TIME_FORMAT = "HH:mm"

interface Props {
  open: boolean;
  timeLog: TimeLog;
  onCancel: () => void;
  onSubmit: (timeLog: TimeLog) => void;
}

interface ChangeEvent {
  target: {
    value: string;
  }
}

export default function FormDialog(props: Props) {
  const { open, onCancel, onSubmit } = props;

  const [timeLog] = useState(props.timeLog);

  function handleStartTime(event: ChangeEvent) {
    const [hours, minutes] = event.target.value.split(':')
    timeLog.startTime.setHours(+hours)
    timeLog.startTime.setMinutes(+minutes)
  }

  function handleCancel() {
    onCancel()
  }

  function handleSubmit() {
    onSubmit(timeLog)
  }

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            id="startTime"
            label="Start"
            type="time"
            defaultValue={format(timeLog.startTime, TIME_FORMAT)}
            autoFocus
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleStartTime}
          />
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
