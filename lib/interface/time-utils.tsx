export function formatDuration(durationMs: number) {
  if (durationMs === 0) {
    return ">0 m"
  }

  const { hours, minutes, seconds } = parseMs(durationMs)

  return `${hours} h ${minutes} m ${seconds} s`
}

export function formatTime(durationMs: number) {
  const { hours, minutes, seconds } = parseMs(durationMs)

  const pad = (num: number) => `0${num}`.slice(-2)

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

function parseMs(milliseconds: number) {
  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
  }
}