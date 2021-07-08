import parseMs from "./parse-ms"

interface Props {
  milliseconds: number;
  zero: string;
}

export default function Duration({ milliseconds, zero }: Props) {
  let formattedDuration = zero;

  const { hours, minutes, seconds } = parseMs(milliseconds)

  if (milliseconds > 0) {
    formattedDuration = `${hours} h ${minutes} m`
  }

  if (hours === 0) {
    formattedDuration = `${minutes} m`
  }

  if (minutes === 0) {
    formattedDuration = `${seconds} s`
  }

  return (
    <span>{formattedDuration}</span>
  )
}
