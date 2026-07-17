import TimeLog from "../../domain/TimeLog";
import { TimeField } from "./TimeField";
import ChangeEvent, { TimeLogEventTarget } from "./ChangeEvent";
import { updateTime } from "./formDialogReducer";
import useStateFromProps from "./useStateFromProps";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";
import Dialog from "../ui/Dialog";

interface Props {
  open: boolean;
  timeLog: TimeLog;
  onClose?: () => void;
}

export default function FormDialog(props: Props) {
  const { open, onClose } = props;

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
      close();
    }
  }

  function close() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={close} titleId="form-dialog-title">
      <h2
        id="form-dialog-title"
        className="px-6 pt-5 text-lg font-medium text-content-primary"
      >
        Edit
      </h2>
      <div className="flex flex-col gap-4 px-6 py-4">
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
      </div>
      <div className="flex justify-end gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={close}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/10"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/10"
        >
          Save
        </button>
      </div>
    </Dialog>
  );
}
