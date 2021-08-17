import { TableCell, TableRow } from "@material-ui/core";
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
    <TableRow>
      <TableCell>
        <DateCell time={timeLog.startTime} />
      </TableCell>
      <TableCell align="right" style={{ minWidth: "120px" }}>
        <TitleDescription
          title={formattedDuration}
          description={formattedTimeRange}
        />
      </TableCell>
      <TableCell align="right">
        <TableRowActionButton timeLog={timeLog} />
      </TableCell>
    </TableRow>
  );
}
