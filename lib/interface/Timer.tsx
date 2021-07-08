import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimeLog from '../domain/TimeLog';
import Time from './Time';

interface Props {
  elapsedMs: number;
}

const BLUE = "#3f51b5"
const GRAY = "#dddddd"

export default function Timer({ elapsedMs }: Props) {
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
          <div style={{ color: BLUE, fontSize: '2em' }}><Time milliseconds={workTimeMs} /></div>
        </CircularProgressbarWithChildren>
      </div>
    </>
  )
}
