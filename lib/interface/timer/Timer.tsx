import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimeLog from "../../domain/TimeLog";
import Time from "./Time";
import StartStopButton from "./StartStopButton";
import TimeLogStatistics from "../../domain/TimeLogStatistics";

interface Props {
  timeLogs: TimeLog[];
  onClick: () => Promise<void>;
}

const ACCENT = "var(--color-accent)";
const DANGER = "var(--color-danger)";
const TRAIL = "var(--color-border-primary)";
const DIAMETER = 250;

export default function Timer({ timeLogs, onClick }: Props) {
  const statistics = new TimeLogStatistics(timeLogs);

  const { isRunning, value, percentage, isOverdue } =
    statistics.getTimerValues();

  const color = isOverdue ? DANGER : ACCENT;

  const progressStyles = buildStyles({ pathColor: color, trailColor: TRAIL });

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
