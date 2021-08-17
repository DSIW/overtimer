import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import TimeLog from "../../domain/TimeLog";
import { TimeField } from "./TimeField";
import ChangeEvent, { TimeLogEventTarget } from "./ChangeEvent";
import { updateTime } from "./formDialogReducer";
import useStateFromProps from "./useStateFromProps";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";

interface Props {
  open: boolean;
  timeLog: TimeLog;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export default function FormDialog(props: Props) {
  const { open, onCancel, onSubmit } = props;

  const [state, setState] = useStateFromProps(props.timeLog);

  const { timeLog, error } = state;
  const { startTime, endTime } = timeLog;

  function handleTime(event: ChangeEvent) {
    const { name, value } = event.target as TimeLogEventTarget;
    const [hours, minutes] = value.split(":");

    setState(updateTime(state, { name, hours: +hours, minutes: +minutes }));
  }

  async function handleSubmit() {
    if (timeLog.isValid()) {
      await timeLogApplicationService.update(timeLog);
      onSubmit && onSubmit();
    }
  }

  function cancel() {
    onCancel && onCancel();
  }

  return (
    <Dialog open={open} onClose={cancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <TimeField
          name="startTime"
          label="Start"
          defaultTime={startTime}
          error={error}
          onChange={handleTime}
        />
        {endTime && (
          <TimeField
            name="endTime"
            label="End"
            defaultTime={endTime}
            error={error}
            onChange={handleTime}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
