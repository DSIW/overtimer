import TimeLog from "../../../domain/TimeLog";
import { todayWorkdayEnd } from "../../../domain/time-constants";
import { format } from "date-fns";
import Alert from "../../ui/Alert";

interface Props {
  timeLogs: TimeLog[];
}

const formattedWorkdayEnd = format(todayWorkdayEnd(), "HH:mm");
const WARNING_MESSAGE = `Time logs are automatically exported after ${formattedWorkdayEnd}.`;

export default function BackupInfoTableRow({ timeLogs }: Props) {
  if (timeLogs.length <= 0) {
    return null;
  }

  return (
    <tr>
      <td colSpan={3} className="p-0">
        <Alert severity="info">{WARNING_MESSAGE}</Alert>
      </td>
    </tr>
  );
}
