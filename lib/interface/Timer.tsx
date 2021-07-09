import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimeLog from '../domain/TimeLog';
import Time from './Time';
import Button from '@material-ui/core/Button'
import { Pause, PlayArrow } from '@material-ui/icons';

interface Props {
  elapsedMs: number;
  isRunning: boolean;
  onClick: () => void;
}

const BLUE = "#3f51b5"
const GRAY = "#dddddd"
const DIMETER = 250

export default function Timer({ elapsedMs, isRunning, onClick }: Props) {
  const totalWorkMs = TimeLog.getTotalWorkMs()
  const workTimeMs = totalWorkMs - elapsedMs
  const value = workTimeMs

  return (
    <>
      <div style={{ width: DIMETER, height: DIMETER }}>
        <CircularProgressbarWithChildren minValue={0} maxValue={totalWorkMs} value={value} strokeWidth={4} styles={buildStyles({
          pathColor: BLUE,
          trailColor: GRAY
        })}>
          <div style={{ color: BLUE, fontSize: '2em', marginTop: '3rem' }}>
            <Time milliseconds={workTimeMs} />
          </div>
          
          <Button variant="outlined" color="primary" onClick={onClick} startIcon={
            isRunning ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />
          } style={{ marginTop: '1rem' }}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
        </CircularProgressbarWithChildren>
      </div>
    </>
  )
}
