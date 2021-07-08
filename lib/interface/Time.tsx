import parseMs from './parse-ms';

interface Props {
  milliseconds: number;
}

function pad(num: number) {
  return `0${num}`.slice(-2)
}

export default function Time({ milliseconds }: Props) {
  let formattedDuration = ">0 m"

  const { hours, minutes, seconds } = parseMs(milliseconds)

  if (milliseconds > 0) {
    formattedDuration = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  return (
    <span>{formattedDuration}</span>
  )
}
