import Button from '@material-ui/core/Button'
import { Pause, PlayArrow } from '@material-ui/icons';

interface Props {
  isRunning: boolean;
  onClick: () => void;
}

export default function StartStopButton({ isRunning, onClick }: Props) {
  return (
    <Button variant="outlined" color="primary" onClick={onClick} startIcon={
      isRunning ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />
    } style={{ marginTop: '1rem' }}>
      {isRunning ? 'Pause' : 'Start'}
    </Button>
  )
}
