import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { formatDuration } from 'date-fns'
import { useStopwatch } from 'react-timer-hook'
import useInterval from '@use-it/interval'

export default function Timer() {
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

  function handleStartStop() {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }

  const duration = { seconds, minutes, hours, days };
  
  const formattedTime = formatDuration(duration)

  return (
    <>
      {formattedTime}
      <Button variant="contained" color="primary" onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      {!isRunning && formattedTime && (
        <Button variant="outlined" color="primary" onClick={() => reset(0, false)}>
          Reset
        </Button>
      )}
    </>
  )
}
