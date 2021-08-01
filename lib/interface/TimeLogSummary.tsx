import { Typography } from "@material-ui/core";
import TimeLog from "../domain/TimeLog";
import Duration from "./Duration";
import TimeLogStatistics from "../domain/TimeLogStatistics";

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerLogSummary({ timeLogs }: Props) {
  const totalOvertimeMs = new TimeLogStatistics(timeLogs).getTotalOvertimeMs();

  return (
    <div style={{ margin: "2rem" }}>
      <Typography color="textSecondary" gutterBottom>
        TOTAL OVERTIME
      </Typography>
      <Typography
        variant="body2"
        component="p"
        align="right"
        color="primary"
        style={{ fontSize: "1.3rem" }}
      >
        <Duration milliseconds={totalOvertimeMs} />
      </Typography>
    </div>
  );
}
