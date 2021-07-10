import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimeLog from '../domain/TimeLog';
import Time from './Time';
import StartStopButton from './StartStopButton';
import TimeLogStatistics from '../domain/TimeLogStatistics';

interface Props {
  timeLogs: TimeLog[];
  onClick: () => void;
}

const BLUE = "#3f51b5"
const RED = "#A71608"
const GRAY = "#dddddd"
const DIMETER = 250

export default function Timer({ timeLogs, onClick }: Props) {

  const statistics = new TimeLogStatistics(timeLogs)

  const { isRunning, value, percentage, isOverdue } = statistics.getTimerValues()

  const color = isOverdue ? RED : BLUE

  const progressStyles = buildStyles({ pathColor: color, trailColor: GRAY })

  return (
    <>
      <div style={{ width: DIMETER, height: DIMETER }}>
        <CircularProgressbarWithChildren value={percentage} strokeWidth={4} styles={progressStyles}>
          <div style={{ color, fontSize: '2em', marginTop: '3rem' }}>
            <Time milliseconds={value} />
          </div>
          
          <StartStopButton isRunning={isRunning} onClick={onClick} />
        </CircularProgressbarWithChildren>
      </div>
    </>
  )
}
