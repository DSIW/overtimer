import { format } from "date-fns";
import TimeLog from "../../domain/TimeLog";
import TableRowActionButton from "./TableRowActionButton";
import Duration from "../Duration";
import TitleDescription from "./TitleDescription";
import DateCell from "./DateCell";

const TIME_FORMAT = "HH:mm";

interface Props {
  timeLog: TimeLog;
}

export default function TimerLogTableRow({ timeLog }: Props) {
  const duration = timeLog.getDurationMs();

  const formattedStartTime = format(timeLog.startTime, TIME_FORMAT);
  const formattedEndTime =
    timeLog.endTime && format(timeLog.endTime, TIME_FORMAT);

  const formattedTimeRange = timeLog.endTime
    ? `${formattedStartTime} - ${formattedEndTime}`
    : `started ${formattedStartTime}`;
  const formattedDuration = <Duration milliseconds={duration} zero=">0 s" />;

  return (
    <tr className="border-b border-border-secondary last:border-b-0">
      <td className="px-4 py-3">
        <DateCell time={timeLog.startTime} />
      </td>
      <td className="min-w-[120px] px-4 py-3 text-right">
        <TitleDescription
          title={formattedDuration}
          description={formattedTimeRange}
        />
      </td>
      <td className="px-4 py-3 text-right">
        <TableRowActionButton timeLog={timeLog} />
      </td>
    </tr>
  );
}
