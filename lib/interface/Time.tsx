import parseMs from './parse-ms';

interface Props {
  milliseconds: number;
}

function pad(num: number) {
  return `0${num}`.slice(-2)
}

export default function Time({ milliseconds }: Props) {
  if (milliseconds === 0) {
    return ">0 m"
  }

  const { hours, minutes, seconds } = parseMs(milliseconds)

  const formattedDuration = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`

  return (
    <span>{formattedDuration}</span>
  )
}
