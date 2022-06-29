import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimeLog from "../../domain/TimeLog";
import Time from "./Time";
import StartStopButton from "./StartStopButton";
import TimeLogStatistics from "../../domain/TimeLogStatistics";
import { useTheme } from "@mui/material";

interface Props {
  timeLogs: TimeLog[];
  onClick: () => Promise<void>;
}

const GRAY = "#dddddd";
const DIAMETER = 250;

export default function Timer({ timeLogs, onClick }: Props) {
  const theme = useTheme();

  const blue = theme.palette.primary.main;
  const red = theme.palette.secondary.main;

  const statistics = new TimeLogStatistics(timeLogs);

  const { isRunning, value, percentage, isOverdue } =
    statistics.getTimerValues();

  const color = isOverdue ? red : blue;

  const progressStyles = buildStyles({ pathColor: color, trailColor: GRAY });

  return (
    <>
      <div style={{ width: DIAMETER, height: DIAMETER }}>
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={4}
          styles={progressStyles}
        >
          <div style={{ color, fontSize: "2em", marginTop: "3rem" }}>
            <Time milliseconds={value} />
          </div>

          <StartStopButton
            isRunning={isRunning}
            isOverdue={isOverdue}
            onClick={onClick}
          />
        </CircularProgressbarWithChildren>
      </div>
    </>
  );
}
