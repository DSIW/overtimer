import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimeLog from '../domain/TimeLog';
import Time from './Time';
import IconButton from '@material-ui/core/IconButton'
import { Pause, PlayArrow } from '@material-ui/icons';

interface Props {
  elapsedMs: number;
  isRunning: boolean;
  onClick: () => void;
}

const BLUE = "#3f51b5"
const GRAY = "#dddddd"

export default function Timer({ elapsedMs, isRunning, onClick }: Props) {
  const totalWorkMs = TimeLog.getTotalWorkMs()
  const workTimeMs = totalWorkMs - elapsedMs
  const value = workTimeMs

  return (
    <>
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbarWithChildren minValue={0} maxValue={totalWorkMs} value={value} strokeWidth={6} styles={buildStyles({
          pathColor: BLUE,
          trailColor: GRAY
        })}>
          <div style={{ color: BLUE, fontSize: '2em', marginTop: '3rem' }}>
            <Time milliseconds={workTimeMs} />
          </div>
          
          <IconButton onClick={onClick} style={{ marginTop: '1rem', color: BLUE, background: GRAY }}>
            {isRunning ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
          </IconButton>
        </CircularProgressbarWithChildren>
      </div>
    </>
  )
}
