import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { formatDuration } from 'date-fns'
import { useStopwatch } from 'react-timer-hook'
import useInterval from '@use-it/interval'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const HOURS = 60*60

export default function Timer() {
  const [countdownReset, setCountdownReset] = useState(0);
  const resetCountdown = () => setCountdownReset(countdownReset + 1)

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const duration = { seconds, minutes, hours, days };
  
  const formattedTime = formatDuration(duration)

  const resetable = !isRunning && formattedTime

  function handleStartStop() {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }

  function handleReset() {
    reset(0, false)
    resetCountdown()
  }

  return (
    <>
      <CountdownCircleTimer
        key={countdownReset}
        onComplete={() => {
          return [false] // do not repeat
        }}
        isPlaying={isRunning}
        duration={30}
        rotation="counterclockwise"
        colors="#3f51b5"
        trailColor="#dddddd"
      >
        {({ remainingTime }) => {
          const hours = Math.floor(remainingTime / 3600)
          const minutes = Math.floor((remainingTime % 3600) / 60)
          const seconds = remainingTime % 60

          const pad = (num) => `0${num}`.slice(-2)

          return (
            <div style={{ fontSize: '1.5rem' }}>
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </div>
          );
        }}
      </CountdownCircleTimer>

      <Button variant="contained" color="primary" onClick={handleStartStop} style={{ marginTop: '1rem' }}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>

      <Button variant="outlined" color="primary" disabled={!resetable} onClick={handleReset} style={{ marginTop: '1rem' }}>
        Reset
      </Button>
    </>
  )
}
