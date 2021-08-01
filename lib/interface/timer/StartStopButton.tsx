import Button from '@material-ui/core/Button';
import { Stop, PlayArrow } from '@material-ui/icons';

interface Props {
  isRunning: boolean;
  isOverdue: boolean;
  onClick: () => void;
}

export default function StartStopButton({
  isRunning,
  isOverdue,
  onClick,
}: Props) {
  return (
    <Button
      variant="outlined"
      color={isOverdue ? 'secondary' : 'primary'}
      onClick={onClick}
      startIcon={
        isRunning ? <Stop fontSize="large" /> : <PlayArrow fontSize="large" />
      }
      style={{ marginTop: '1rem', width: '6rem' }}
    >
      {isRunning ? 'Stop' : 'Start'}
    </Button>
  );
}
